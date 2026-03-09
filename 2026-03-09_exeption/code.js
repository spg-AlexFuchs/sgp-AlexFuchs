// Exception-Stil Funktion: Benutzername validieren
//

function validateUsernameException(username) {
  if (typeof username !== "string") {               //wenn nicht string -> error
    throw new Error("Benutzername muss ein String sein");
  }
  if (username.length < 3) {                        //wenn zu kurz -> error
    throw new Error("Benutzername zu kurz (mindestens 3 Zeichen)");
  }
  return true;                                      // gültig
}

// Aufruf mit try/catch
//

try {
  const result = validateUsernameException("us");                   //obere funktion mit namen "us" aufgerufen
  console.log("Benutzername gültig (Exception-Stil):", result);
} catch (e) {
  console.error("Fehler (Exception-Stil):", e.message);
}



























// Result-Stil Funktion: Benutzername validieren
//

function validateUsernameResult(username) {
  if (typeof username !== "string") {
    return { status: "schlecht", data: "Benutzername muss ein String sein" };
  }
  if (username.length < 3) {
    return { status: "schlecht", data: "Benutzername zu kurz (mindestens 3 Zeichen)" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { status: "schlecht", data: "Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten" };
  }
  return { status: "gut", data: true };
}

// Aufruf und Auswertung
//

const result2 = validateUsernameResult("user_123");
if (result2.status === "gut") {
  console.log("Benutzername gültig (Result-Stil):", result2.data);
} else {
  console.error("Fehler (Result-Stil):", result2.data);
}
