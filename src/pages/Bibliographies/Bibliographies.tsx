/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { bibliographiesData } from "../../data/bibliographies";

/////////////////////////////////////
// COMPONENT: BIBLIOGRAPHIES
/////////////////////////////////////

const Bibliographies = ({ scroll }: any) => {
  return (
    <div className="flex flex-col items-center py-12 bg-black">
      <div className="flex flex-col items-center self-stretch px-20 mt-1.5 w-full max-md:px-5 max-md:max-w-full">
        <Navbar scroll={scroll} />
        <br />
        <br />
        <div className="hammersmith-one-regular text-2xl text-white max-md:max-w-full max-md:text-4xl">
          Bibliographies
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="w-full h-full flex flex-row m-auto max-w-6xl gap-20 ">
        <table className="min-w-full divide-y divide-gray-200 bg-black shadow overflow-hidden sm:rounded-lg">
          <thead className="bg-black">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#CB6CE6] uppercase tracking-wider"
              >
                NAME
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#CB6CE6] uppercase tracking-wider hidden md:table-cell"
              >
                AUTHOR
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#CB6CE6] uppercase tracking-wider"
              >
                LINK
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-200">
            {bibliographiesData.map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  {entry.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white hidden md:table-cell">
                  {entry.author || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">
                  <b>
                    <a
                      href={entry.link}
                      target="_blank"
                      className="hidden md:inline"
                    >
                      {entry.link}
                    </a>
                    <a
                      href={entry.link}
                      target="_blank"
                      className="inline md:hidden"
                    >
                      <span className="block">LINK</span>
                    </a>
                  </b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

/////////////////////////////////////
// EXPORTING BIBLIOGRAPHIES
/////////////////////////////////////

export default Bibliographies;
