export async function generateP256(): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify']
  );
}

export async function sha256Bytes(input: Uint8Array): Promise<string> {
  const digest = await window.crypto.subtle.digest('SHA-256', input);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function signP256(privateKey: CryptoKey, data: Uint8Array): Promise<string> {
  const sig = await window.crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, 
    privateKey, 
    data
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function exportPublicKey(key: CryptoKey): Promise<JsonWebKey> {
  return await window.crypto.subtle.exportKey('jwk', key);
}