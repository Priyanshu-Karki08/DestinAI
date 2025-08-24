import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AutocompleteInput from "@/service/AutoCompleteInput.jsx";
import {
  SelectBudgetOptions,
  SelectTravelsList,
  AI_PROMPT,
} from "@/constants/options";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { Loader } from "lucide-react"; 
import { db } from "@/service/firebaseconfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceChange = (value) => {
    setPlace(value);
    setFormData((prev) => ({ ...prev, destination: value }));
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const GeminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const Geofyapikey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData?.noOfDays ||
      formData?.noOfDays > 7 ||
      !formData?.destination ||
      !formData.budget ||
      !formData.traveler
    ) {
      return toast.error("Invalid Credentials!");
    }

    setLoading(true);

    const Final_Prompt = AI_PROMPT.replace("{location}", formData?.destination?.name)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const genAI = new GoogleGenerativeAI(`${GeminiApiKey}`);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(Final_Prompt);
      const responseText = result?.response.text();

      setLoading(false);
      if (responseText) {
        SaveAITrip(responseText);
        toast.success("Your trip plan has been generated successfully! 🎉");
      } else {
        toast.error("Sorry, we couldn't generate your trip plan right now.");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("An error occurred while generating your trip plan.");
      setLoading(false);
    }
  };

  const SaveAITrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    const parsedData = JSON.parse(TripData);

    setLoading(true);
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      TripData: parsedData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const getUserProfile = (tokeninfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="relative px-6 sm:px-10 md:px-32 lg:px-56 xl:px-72 py-12">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <h1 className="font-bold text-4xl text-white">Tell us your travel preferences ✈️</h1>
        <p className="mt-3 text-lg font-medium text-gray-200">
          Just provide some basic information, and our trip planner will generate
          a customized itinerary for you.
        </p>

        {/* Destination */}
        <div className="mt-12">
          <h2 className="text-xl text-white font-semibold">Destination</h2>
          <AutocompleteInput
            apiKey={Geofyapikey}
            onChange={handlePlaceChange}
            placeholder="Enter your dream destination (e.g., Paris, Tokyo)"
            className="mt-4 w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Days */}
        <div className="mt-8">
          <h2 className="text-xl text-white font-semibold">Trip Duration</h2>
          <Input
            placeholder="Ex. 3 (max 10)"
            type="number"
            min = {1}
            max = {10}
            onChange={(e) => handleInputChange("noOfDays", parseInt(e.target.value) || "")}
            className="mt-4 w-full text-white rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Budget */}
        <div className="mt-8">
          <h2 className="text-xl text-white font-semibold">Select Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-6 rounded-2xl border text-center cursor-pointer transition option-card 
                  ${formData?.budget === item.title 
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105"
                    : "bg-gradient-to-br from-orange-900/60 via-black/70 to-red-900/60 hover:shadow-lg hover:-translate-y-1 "}
                `}
              >
                <h1 className="text-4xl mb-2">{item.icon}</h1>
                <h2 className="font-bold text-lg text-amber-300 drop-shadow">{item.title}</h2>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div className="mt-8">
          <h2 className="text-xl text-white font-semibold">Who are you traveling with?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-6 rounded-2xl border text-center cursor-pointer transition option-card 
                  ${formData?.traveler === item.people 
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105"
                    : "bg-gradient-to-br from-orange-900/60 via-black/70 to-red-900/60 hover:shadow-lg hover:scale-105 transition-all"}
                `}
              >
                <h1 className="text-4xl mb-2">{item.icon}</h1>
                <h2 className="font-bold text-lg text-amber-300">{item.title}</h2>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip */}
        <div className="mt-12 flex justify-end">
          {localStorage.getItem('user') ? <Button
            className="cursor-pointer bg-orange-600 hover:bg-orange-700 rounded-xl px-6 py-3 text-lg font-semibold shadow-md hover:shadow-xl transition"
            onClick={onGenerateTrip}
          >
            {loading ? <Loader className="animate-spin" /> : "🚀 Generate Trip"}
          </Button>
          : 
          <Button
            disabled = {true}
            className="cursor-pointer bg-orange-600 hover:bg-orange-700 rounded-xl px-6 py-3 text-lg font-semibold shadow-md hover:shadow-xl transition">
            Please Sign in 
          </Button>
          }

        </div>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="rounded-2xl p-6 shadow-xl">
          <DialogHeader className="text-center">
            <DialogDescription>
              <img src="logo.svg" className="mx-auto w-16" />
              <h2 className="font-bold text-2xl mt-4 mb-2 text-black">Sign In with Google</h2>
              <p className="text-gray-500">Authenticate securely to continue.</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-black border rounded-lg shadow hover:shadow-md"
              >
                <FcGoogle className="text-xl" /> Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
