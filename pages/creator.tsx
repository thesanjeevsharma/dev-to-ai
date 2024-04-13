import React from "react";
import Image from "next/image";
import { AiOutlineDownload } from "react-icons/ai";

import { IMAGE_STYLES } from "@/constants";

import { Button, Select } from "@/components";
import { RootLayout } from "@/layouts";

const Creator = () => {
  const [description, setDescription] = React.useState<string>("");
  const [imageStyle, setImageStyle] = React.useState<string>("3D model");
  const [error, setError] = React.useState<string>("");

  const [isGeneratingImage, setIsGeneratingImage] =
    React.useState<boolean>(false);
  const [isGeneratingPlan, setIsGeneratingPlan] =
    React.useState<boolean>(false);

  const [imgUrl, setImgUrl] = React.useState<string>("");
  const [plan, setPlan] = React.useState<string>("");

  const resetApp = () => {
    setError("");
    setImgUrl("");
    setPlan("");
  };

  const handleGenerateImage = React.useCallback(async () => {
    try {
      setIsGeneratingImage(true);

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description,
          style: imageStyle,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setIsGeneratingImage(false);
          setImgUrl(data.image);
        } else {
          throw new Error("Failed to generate image");
        }
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (error) {
      setIsGeneratingImage(false);
      console.error(error);
    }
  }, [description, imageStyle]);

  const handleGeneratePlan = React.useCallback(async () => {
    try {
      setIsGeneratingPlan(true);

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setIsGeneratingPlan(false);
          setPlan(data.result.response);
        } else {
          throw new Error("Failed to generate plan");
        }
      } else {
        throw new Error("Failed to generate plan");
      }
    } catch (error) {
      setIsGeneratingPlan(false);
      console.error(error);
    }
  }, [description]);

  const handleGenerate = () => {
    try {
      resetApp();

      const len = description.trim().split(" ").length;
      const isValid = len >= 6 && len <= 30;
      if (!isValid) {
        setError("Description should be between 6 and 30 words");
        return;
      }

      handleGenerateImage();
      handleGeneratePlan();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = "article-cover.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isGenerating = isGeneratingImage || isGeneratingPlan;
  const isPartiallyGenerated = (imgUrl || plan) && isGenerating;

  return (
    <RootLayout mode="creator">
      <div className="p-4 md:py-8">
        <div className="mb-8">
          <p className="text-white text-sm mb-2 md:text-md">
            Need a structured plan for your next article? Briefly describe your
            idea and let DEV AI help you generate a cover image and a plan for
            your article.
          </p>
          <div className="mb-4">
            <textarea
              className="w-full p-2 bg-zinc-900 text-white border border-zinc-800 rounded-md"
              name="description"
              id="description"
              rows={5}
              placeholder="e.g. The rise of AI tools in software development"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {!!error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="mb-4">
            <Select
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
              options={IMAGE_STYLES}
              label="Choose an image style"
            />
          </div>
          <Button
            disabled={!description || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? "Generating..." : "Generate Image and Plan"}
          </Button>
        </div>

        {isPartiallyGenerated && (
          <div className="mb-4 text-center">
            <p className="text-white text-xs text-yellow-600">
              Hold on! Still working on the remaining part.
            </p>
          </div>
        )}

        {(imgUrl || plan) && (
          <div className="mb-8">
            {!!imgUrl && (
              <div className="mb-6 text-white">
                <h3 className="font-medium mb-2">Cover image:</h3>
                <div className="relative w-full h-80 md:w-1/2">
                  <span
                    className="z-10 right-2 top-2 flex items-center absolute bg-white text-black p-2"
                    onClick={handleDownloadImage}
                    role="button"
                    tabIndex={1}
                  >
                    <AiOutlineDownload />{" "}
                    <span className="ml-2 text-sm"> Download </span>
                  </span>
                  <Image alt="AI generated" src={imgUrl} fill={true} />
                </div>
              </div>
            )}
            {!!plan && (
              <div className="text-white">
                <h3 className="font-medium mb-2">Plan for your article:</h3>
                <div className="bg-zinc-900 rounded p-2 text-md whitespace-pre-line">
                  {plan}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default Creator;
