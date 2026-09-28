// middleware/validateTokenHandler.js
const jwt = require("jsonwebtoken");

let firebaseCertificates;
let certificatesExpiresAt = 0;

const getFirebaseCertificates = async () => {
  if (firebaseCertificates && Date.now() < certificatesExpiresAt)
    return firebaseCertificates;

  const response = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
  );
  if (!response.ok)
    throw new Error("Unable to retrieve Firebase signing certificates");
  firebaseCertificates = await response.json();
  const cacheControl = response.headers.get("cache-control") || "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1]) || 3600;
  certificatesExpiresAt = Date.now() + maxAge * 1000;
  return firebaseCertificates;
};

const verifyFirebaseToken = async (token) => {
  const decoded = jwt.decode(token, { complete: true });
  const projectId = decoded?.payload?.aud;
  const keyId = decoded?.header?.kid;
  if (
    !projectId ||
    !keyId ||
    decoded.payload.iss !== `https://securetoken.google.com/${projectId}`
  ) {
    throw new Error("Invalid Firebase token");
  }

  const certificates = await getFirebaseCertificates();
  const verified = jwt.verify(token, certificates[keyId], {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });
  if (!verified.uid) throw new Error("Firebase token has no user id");
  return {
    id: verified.uid,
    display_name: verified.name || verified.email || "Google user",
    email: verified.email,
  };
};

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    try {
      req.user = await verifyFirebaseToken(token);
      next();
    } catch (firebaseError) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
};

module.exports = validateToken;
