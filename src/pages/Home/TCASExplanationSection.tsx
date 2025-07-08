/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React from "react";
import CenteredLatex from "../../components/CenteredLatex";

/////////////////////////////////////
// FUNCTION: TCAS WRITING
/////////////////////////////////////

const TCASExplanationSection = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8 max-w-screen-lg mx-auto">
      <section id="introduction">
        <h1 className="text-xl font-semibold">What is TCAS?</h1>
        <p>
          TCAS or the Traffic Collision Avoidance System is designed to prevent
          the mid-air collisions of aircraft. It operates indepdently from ATC,
          which give directions through radio and are operated by humans. TCAS
          automatically reorientates aircrafts by seeing if an aircraft becomes
          a potential collision risk. There are two main parts of TCAS: TA
          (Traffic Advisory) and RA (Resolution Advisory). Aircrafts within the
          traffic advisory just need to be visually identified by piltos whereas
          those in the resolution advisory must be delt with immediately.
        </p>
      </section>
      <br />
      <br />
      <section id="introduction">
        <h1 className="text-xl font-semibold">Calculation of Collision Time</h1>
        <p>Ownership: </p>
        <CenteredLatex text={"P_0(t) = \\vec{r_0} + v_0t"} />
        <p>Intruder: </p>
        <CenteredLatex text={"P_i(t) = \\vec{r_i} + v_it"} />
        Therefore, a relative vector betweeen the two can be written as:
        <CenteredLatex text={"\\vec{r_{rel}}(t) = P_i(t)-P_0(t)"} />
        <CenteredLatex
          text={
            "= \\vec{r_i} + v_it-(\\vec{r_0} + v_0t) = (\\vec{r_i}-\\vec{r_0})+(v_i-v_0)t"
          }
        />
        Therefore:
        <CenteredLatex
          text={
            "\\vec{r_{diff}} = \\vec{r_i} - \\vec{r_o}, \\ and \\ \\vec{v_{diff}} = v_i - v_0"
          }
        />
        The distance between
      </section>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING TCAS WRITING
/////////////////////////////////////

export default TCASExplanationSection;
