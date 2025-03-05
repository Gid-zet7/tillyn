"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

export default function CurvedText() {
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    function circularText(
      className: string,
      text: string,
      radius: number,
      range: number,
      startPos: number,
      css: string,
      bottomCss: string
    ): void {
      const textArr: string[] = text.split("");
      const container = document.querySelector<HTMLDivElement>(".container");

      if (!container) {
        console.error("Container element not found");
        return;
      }

      const containerHeight: number = container.clientHeight;
      const newElement: HTMLDivElement = document.createElement("div");
      newElement.setAttribute("class", className);

      const deg: number = range / textArr.length;
      textArr.forEach((ch) => {
        const styledText: string =
          `<p style="height:${radius}px;${css};transform:rotate(${startPos}deg);left:50%;top:${
            containerHeight / 2 - radius
          }px;position:absolute;transform-origin:0 100%">` +
          `<span style="${bottomCss}">${ch}</span>` +
          `</p>`;
        newElement.innerHTML += styledText;
        startPos += deg;
      });

      container.appendChild(newElement);
    }

    // Clear previous content
    const container = document.querySelector<HTMLDivElement>(".container");
    if (container) container.innerHTML = "";

    // Apply theme-specific styles
    const textColor = theme === "dark" ? "#fff" : "#000";
    const fontSizeLarge = "28px";
    const fontSizeSmall = "12px";

    // Example usage
    circularText(
      "text circTxt1",
      "Clothing arena",
      100,
      -170,
      -100,
      `font-size: ${fontSizeLarge}; color: ${textColor};`,
      "transform : scaleY(-1) scaleX(-1); position:absolute"
    );

    circularText(
      "text circTxt2",
      "The Best",
      100,
      170,
      -85,
      `font-size: ${fontSizeLarge}; color: ${textColor};`,
      ""
    );

    circularText(
      "text circTxt1",
      "This is Ghana's number one",
      70,
      175,
      -85,
      `font-size: ${fontSizeSmall}; color: ${textColor};`,
      ""
    );

    circularText(
      "text circTxt2",
      "clothing store",
      70,
      -95,
      -135,
      `font-size: ${fontSizeSmall}; color: ${textColor};`,
      "transform : scaleY(-1) scaleX(-1); position:absolute"
    );
  }, [theme]); // Re-run effect when theme changes

  return <div className="container"></div>;
}
