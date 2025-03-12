
import { env } from "process";
import { useEffect, useState } from "react";

const StatesApi = () => {
    const [states, setStates] = useState<string[]>([]);
    const [lgas, setLgas] = useState<string[]>([]);
    const [loadingLgas, setLoadingLgas] = useState(false);
    
    const [formData, setFormData] = useState({
      price: "",
      stateNig: "",
      address: "",
      description: "",
      houseType: "",
      contact: "",
    });
 // Fetch states
 
    const fetchStates = async () => {
      console.log("Fetching states...");

      try {
        const response = await fetch("https://naija-places.toneflix.com.ng/api/v1/states", {
          headers: { "X-Api-Key": process.env.STATE_API_KEY || '' },
        });

        console.log("State API Response:", response);

        if (!response.ok) throw new Error(`Error fetching states: ${response.statusText}`);

        const rawData = await response.json();
    console.log("State Data:", rawData);
    const data = rawData as { data: { name: string }[] };    
    setStates(data.data.map((item) => item.name));

      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    const fetchLgas = async () => {
       
        setLoadingLgas(true);
  
        try {
          const response = await fetch(`https://naija-places.toneflix.com.ng/api/v1/states/${formData.stateNig}/lgas`, {
            headers: { "X-Api-Key": process.env.STATE_API_KEY || ''},
          });
  
          console.log("LGA API Response:", response);
  
          if (!response.ok) throw new Error(`Error fetching LGAs: ${response.statusText}`);
  
          const rawData = await response.json();
      console.log("State LGA:", rawData);
  
    
      const data = rawData as { data: { name: string }[] };
  
      
      setLgas(data.data.map((item) => item.name));
        } catch (error) {
          console.error("Error fetching LGAs:", error);
        } finally {
          setLoadingLgas(false);
        }
      };

    
  return{
    fetchStates,
    states,
    lgas,
    formData,
    setFormData,
    loadingLgas,
    fetchLgas
  }
}

export default StatesApi
