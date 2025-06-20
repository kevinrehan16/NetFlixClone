import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import { getAIRecommendation } from '../lib/AIModels';

const steps = [
  {
    name: "genre",
    label: "What is your favorite genre?",
    options: [
      "Actions", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Animation",
    ],
  },
  {
    name: "mood",
    label: "What is your current mood?",
    options: [
      "Excited", "Relaxed", "Thoughful", "Scared", "Inspired", "Romantic",
    ],
  },
  {
    name: "decade",
    label: "Preffered decade?",
    options: [
      "2020s", "2010s", "2000s", "1990s", "Older",
    ],
  },
  {
    name: "Language",
    label: "Preferred language?",
    options: [
      "English", "Korean", "Spanish", "French", "Other",
    ],
  },
  {
    name: "length",
    label: "Preferred movie length?",
    options: [
      "Short (<90 min)", "Standard (90-120 min)", "Long (>120 min)",
    ],
  },
];

const initialState = steps.reduce((acc, step) => {
  acc[step.name] = "";
  return acc; 
}, {});
// !THE RESULT SAMPLE OF THIS CODE IS BELOW: IT'S LIFE CREATING AN ARRAY
/*
{
  genre: "",
  mood: "",
  decade: "",
  Language: "",
  length: "",
}
*/ 

const AiRecommendations = () => {
  const [inputs, setInputs] = useState(initialState);
  const [step, setStep] = useState(0);
  const [recommendation, setRecommendation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOption = (value) => {
    setInputs({...inputs, [steps[step].name]: value});
  }

  const handleNext = () => {
    if(step < steps.length - 1){
      setStep(step + 1);
    }
    else{
      console.log(inputs);
      
    }
  }

  const handlePrev = () => {
    if(step > 0){
      setStep(step - 1);
    }
  }

  const generateRecommendations = async () => {
    if(!inputs){
      toast("Please enter your inputs.");
    }
    setIsLoading(true);

    const userPrompt = "Give me 10 movie titles released date 2024. Again movie titles only. No comments, No message, No special characters, No numbers, make it an array result for example: ['Movie Title 1', 'Movie Title 2', 'Movie Title 3',...until, 'Movie Title 10']. no other word, only the example result that I want.";

    const result = await getAIRecommendation(userPrompt);
    setIsLoading(false);
    if(result){
      try {
        setRecommendation(JSON.parse(result.replace(/'/g, '"')));
        // console.log(recommendation);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      toast.error("Failed to get recommendation.");
    }
  }

  return (
    <div>

      <div className='relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 mt-4 flex flex-col items-center min-h-[480px]'>
        <h2 className='text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg'>AI Movie Recommendations</h2>
        <div className='w-full flex items-center mb-8'>
          <div className='flex-1 h-2 bg-[#232323] rounded-full overflow-hidden'>
            <div className='h-full bg-[#e50914] transition-all duration-300' style={{ width: (((step + 1)/ steps.length) * 100) + "%" }}>

            </div>
          </div>
          <span className='ml-4 text-white text-sm font-semibold'>{step + 1}/{steps.length}</span>
        </div>
        <div className='w-full flex flex-col flex-1'>
          <div className='mb-6 flex-1'>
            <h3 className='text-lg font-semibold text-white mb-6 text-center'>{steps[step].label}</h3>

            <div className='grid grid-cols-1 gap-3'>
              {steps[step].options.map((opt, index) => (
                <button onClick={()=>handleOption(opt)} key={index} className={"w-full py-3 rounded-xl border-2 transition font-semibold text-base flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-[#e50914] focus:right-2 active:scale-95 duration-150 shadow-sm "+(inputs[steps[step].name] == opt ? "bg-[#e50914] border-[#e50914] text-white shadow-lg" : "bg-[#232323] border-[#444] text-white shadow-lg hover:bg-[#e50914]/60 hover:border-[#e50914]/30") }>
                  {opt}
                </button>
              ))}
            </div>

            <div className='flex justify-between items-center mt-6'>
              <button type='button' onClick={handlePrev} disabled={step==0} className='px-6 py-2 rounded-lg font-semibold transtion border-2 border-[#444] text-white hover:bg-[#232323]'>Prev</button>
              <button type='button' onClick={step === steps.length - 1 ? generateRecommendations : handleNext} disabled={!inputs[steps[step].name] || isLoading} className='px-6 py-2 rounded-lg font-semibold transtion border-2 bg-[#e50914] border-[#b0060f] text-white hover:bg-[#b0060f] ml-2'>{step === steps.length - 1 ? "Finish" : "Next"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiRecommendations
