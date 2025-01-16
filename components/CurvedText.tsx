"use client";
import React from "react";
import { useEffect } from "react";

export default function CurvedText() {
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

    // Example usage
    circularText(
      "text circTxt1",
      "Clothing arena",
      100,
      -170,
      -100,
      "font-size: 28px; color:#000;",
      "transform : scaleY(-1) scaleX(-1); position:absolute"
    );

    // Example usage
    circularText(
      "text circTxt1",
      "Clothing arena",
      100,
      -170,
      -100,
      "font-size: 28px; color:#000;",
      "transform : scaleY(-1) scaleX(-1); position:absolute"
    );
    circularText(
      "text circTxt2",
      "The Best",
      100,
      170,
      -85,
      "font-size: 28px; color:#000;",
      ""
    );
    circularText(
      "text circTxt1",
      "This is Ghana's number one",
      70,
      175,
      -85,
      "font-size: 12px; color:#000;",
      ""
    );
    circularText(
      "text circTxt2",
      "clothing store",
      70,
      -95,
      -135,
      "font-size: 12px; color:#000;",
      "transform : scaleY(-1) scaleX(-1); position:absolute"
    );
  });

  return <div className="container"> </div>;
}
