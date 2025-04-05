import { useState } from "react";

const StatesApi = () => {
    const [states, setStates] = useState<string[]>([]);
    const [lgas, setLgas] = useState<string[]>([]);
    const [loadingLgas, setLoadingLgas] = useState(false);
    const [isError, setError] = useState('')
    
    const [formData, setFormData] = useState({
      price: "",
      stateNig: "",
      address: "",
      description: "",
      houseType: "",
      contact: "",
    });
 
 
    const fetchStates = async () => {

      try {
        const response = await fetch("https://naija-places.toneflix.com.ng/api/v1/states", {
          headers: { "X-Api-Key": process.env.STATE_API_KEY || '' },
        });

        console.log("State API Response:", response);

        if (!response.ok) throw new Error(`Error fetching states: ${response.statusText}`);
         let rawData;
         try{
           rawData = await response.json();
         } catch(jsonError){
          throw new Error("Invalid JSON response from the API")
         }
    console.log("State Data:", rawData);
    const data = rawData as { data: { name: string }[] };
    if (!rawData || !rawData.data || !Array.isArray(rawData.data)){
      throw new Error("Unexpected API response format")
    }    
    setStates(data.data.map((item) => item.name));
    setError('');
      } catch (error) {
       if(error instanceof TypeError && error.message.includes("fetch")){
        setError("Internet connection error")
       } else {
        setError("An unknown error occured while fetching states")
       }
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
    fetchLgas,
    isError
  }
}

export default StatesApi
