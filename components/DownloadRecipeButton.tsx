"use client";

import { useState } from "react";
import jsPDF from "jspdf";

interface RecipeData {
  title: string;
  description: string;
  image: string;
  chef: string;
  ingredients: string[];
  procedure: string[];
  youtubeUrl?: string;
}

interface DownloadRecipeButtonProps {
  recipeData: RecipeData;
}

export default function DownloadRecipeButton({
  recipeData,
}: DownloadRecipeButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;
      let pageCount = 1;

      const addWatermark = () => {
        pdf.setFontSize(50);
        pdf.setFont("helvetica", "bold");
        // Light/faded red
        pdf.setTextColor(232 as number, 160 as number, 160 as number);
        pdf.text("Epic Bite", pageWidth / 2, pageHeight / 2, {
          align: "center",
          angle: 30,
        });
      };
      addWatermark();

      // Helper function to add a new page if needed
      const checkNewPage = (requiredHeight: number) => {
        if (yPosition + requiredHeight > pageHeight - margin) {
          pdf.addPage();
          pageCount++;
          yPosition = margin;

          // ✅ RESET PAGE STATE (VERY IMPORTANT)
          addWatermark();
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(11);
          pdf.setTextColor(60, 60, 60);
        }
      };

      // Title
      pdf.setFontSize(24);
      pdf.setTextColor(206, 36, 37); // #CE2425
      pdf.setFont("helvetica", "bold");
      const titleLines = pdf.splitTextToSize(recipeData.title, contentWidth);
      pdf.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 10 + 5;

      // Description
      if (recipeData.description) {
        checkNewPage(15);
        pdf.setFontSize(11);
        pdf.setTextColor(60, 60, 60);
        const descLines = pdf.splitTextToSize(
          recipeData.description,
          contentWidth
        );
        pdf.text(descLines, margin, yPosition);
        yPosition += descLines.length * 6 + 10;
      }

      // Recipe Image (if available)
      if (recipeData.image && recipeData.image !== "/images/temp.jpg") {
        try {
          checkNewPage(60);
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = recipeData.image;

          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            setTimeout(reject, 5000); // 5 second timeout
          });

          const imgWidth = contentWidth;
          const imgHeight = (img.height * imgWidth) / img.width;
          const maxHeight = 60;

          if (imgHeight > maxHeight) {
            const scaledWidth = (img.width * maxHeight) / img.height;
            pdf.addImage(
              recipeData.image,
              "JPEG",
              margin,
              yPosition,
              Math.min(scaledWidth, contentWidth),
              maxHeight
            );
            yPosition += maxHeight + 10;
          } else {
            pdf.addImage(
              recipeData.image,
              "JPEG",
              margin,
              yPosition,
              imgWidth,
              imgHeight
            );
            yPosition += imgHeight + 10;
          }
        } catch (error) {
          console.error("Error loading image:", error);
          // Continue without image
        }
      }

      // Ingredients Section
      checkNewPage(20);
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text("Ingredients", margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.setFont("helvetica", "normal");

      if (recipeData.ingredients.length > 0) {
        recipeData.ingredients.forEach((ingredient) => {
          checkNewPage(8);
          const isBold = ingredient.trim().startsWith("*");
          const text = isBold
            ? ingredient.trim().slice(1).trim()
            : ingredient.trim();

          if (isBold) {
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
          } else {
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(60, 60, 60);
          }

          const lines = pdf.splitTextToSize(`• ${text}`, contentWidth - 5);
          pdf.text(lines, margin + 5, yPosition);
          yPosition += lines.length * 6;
        });
      } else {
        pdf.text("No ingredients listed.", margin + 5, yPosition);
        yPosition += 8;
      }

      yPosition += 5;

      // Instructions Section
      checkNewPage(20);
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text("Cooking Instructions", margin, yPosition);
      yPosition += 5;

      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.setFont("helvetica", "normal");

      if (recipeData.procedure.length > 0) {
        recipeData.procedure.forEach((step, index) => {
          checkNewPage(15);
          pdf.setFontSize(11);
          pdf.setTextColor(60, 60, 60);
          pdf.setFont("helvetica", "normal");
          const stepLines = pdf.splitTextToSize(`${step}`, contentWidth);
          pdf.text(stepLines, margin + 2, yPosition);
          yPosition += Math.max(stepLines.length * 6, 10) + 5;
        });
      } else {
        pdf.text("No instructions provided.", margin + 5, yPosition);
        yPosition += 8;
      }

      // YouTube link (if available)
      if (recipeData.youtubeUrl) {
        checkNewPage(10);
        yPosition += 5;
        pdf.setFontSize(15);
        pdf.setTextColor(206, 36, 37);
        pdf.text("Watch on YouTube:", margin, yPosition);
        yPosition += 5;
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 255);
        const urlLines = pdf.splitTextToSize(
          recipeData.youtubeUrl,
          contentWidth
        );
        pdf.text(urlLines, margin, yPosition);
      }

      // Footer
      const totalPages = pageCount;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);

        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        });
      }

      // Save the PDF
      pdf.save(`${recipeData.title.replace(/[^a-z0-9]/gi, "_")}_recipe.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="px-6 py-2 flex justify-center items-center bg-gray-900 text-sm text-white rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? "Generating PDF..." : "Download Recipe PDF"}
    </button>
  );
}
