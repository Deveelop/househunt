const handleSecureRequest = async (propertyId: string) => {
    const userName = prompt("Enter your full name:");
    const userEmail = prompt("Enter your email address:");
    const userContact = prompt("Enter your phone number:");
  
    if (!userName || !userEmail || !userContact) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const res = await fetch("/api/secure-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userEmail, userContact, propertyId }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error);
  
      alert("Your request has been submitted. Await confirmation.");
    } catch (error) {
      console.error("Secure request error:", error);
      alert(error.message);
    }
  };
  