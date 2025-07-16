/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React from "react";
import CenteredLatex from "../../components/CenteredLatex";
var Latex = require("react-latex");

/////////////////////////////////////
// COMPONENT: TCAS EXPLANATION SECTION
/////////////////////////////////////

const TCASExplanationSection = (): JSX.Element => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 pt-8 max-w-screen-lg mx-auto">
      <section id="introduction">
        <h1 className="text-xl font-semibold">What is TCAS?</h1>
        <p>
          TCAS (Traffic Collision Avoidance System) is an airborne system
          designed to reduce the risk of mid-air collisions. Operating
          independently of Air Traffic Control (ATC), it provides real-time
          advisories based on the relative motion of nearby aircraft. These
          advisories are calculated automatically by the onboard system, helping
          pilots avoid conflict zones—especially as aircraft converge toward
          what's known as the Closest Point of Approach (CPA).
        </p>
        <br />
        <p>There are two main classes of TCAS:</p>
        <ul className="list-disc pl-10">
          <li>
            <b>TCAS I:</b> Issues Traffic Advisories (TAs) that alert pilots to
            nearby aircraft but does not provide avoidance instructions.
            Required for some small commercial aircraft (10-30 seats), it's also
            commonly installed on general aviation aircraft.
          </li>
          <li>
            <b>TCAS II:</b> Offers both TAs and Resolution Advisories (RAs),
            which suggest vertical maneuvers to prevent collision. TCAS II is
            mandated on larger commercial aircraft in the U.S. and is found on
            many turbine-powered aircraft worldwide.
          </li>
        </ul>
        <p>
          In short: TAs require pilot awareness and visual confirmation; RAs
          require immediate maneuvering to maintain separation.
        </p>
      </section>

      <br />
      <section id="tau">
        <h1 className="text-xl font-semibold">Deriving Time to CPA</h1>
        <p>
          The time to CPA (denoted as τ or <Latex>{"$t_{CPA}$"}</Latex>) is the
          moment when two aircraft are at their minimum separation, assuming
          constant velocities. This time can be derived using basic kinematics.
        </p>

        <p>Let the position of the ownship be:</p>
        <CenteredLatex text={"P_0(t) = \\vec{r_0} + \\vec{v_0}t"} />

        <p>And the position of the intruder be:</p>
        <CenteredLatex text={"P_i(t) = \\vec{r_i} + \\vec{v_i}t"} />

        <p>The relative position vector between the two is:</p>
        <CenteredLatex text={"\\vec{r}_{rel}(t) = P_i(t) - P_0(t)"} />

        <p>Which simplifies to:</p>
        <CenteredLatex
          text={
            "\\vec{r}_{rel}(t) = (\\vec{r_i} - \\vec{r_0}) + (\\vec{v_i} - \\vec{v_0})t"
          }
        />

        <p>Define:</p>
        <CenteredLatex
          text={
            "\\vec{r}_{diff} = \\vec{r_i} - \\vec{r_0}, \\quad \\vec{v}_{diff} = \\vec{v_i} - \\vec{v_0}"
          }
        />

        <p>
          The distance between the aircraft is given by the magnitude of the
          relative position vector:
        </p>
        <CenteredLatex text={"d(t) = |\\vec{r}_{diff} + \\vec{v}_{diff}t|"} />

        <p>
          To find the minimum distance, we analyze <Latex>{"$d(t)^2$"}</Latex>,
          since minimizing distance and minimizing squared distance yield the
          same result.
        </p>
        <CenteredLatex
          text={"d(t)^2 = |\\vec{r}_{diff} + \\vec{v}_{diff}t|^2"}
        />

        <p>Expanding this using the dot product:</p>
        <CenteredLatex
          text={
            "= \\vec{r}_{diff} \\cdot \\vec{r}_{diff} + 2(\\vec{r}_{diff} \\cdot \\vec{v}_{diff})t + \\vec{v}_{diff} \\cdot \\vec{v}_{diff}t^2"
          }
        />

        <p>
          Taking the derivative of <Latex>$d(t)^2$</Latex> with respect to time
          and setting it to zero yields:
        </p>
        <CenteredLatex
          text={
            "0 = 2(\\vec{r}_{diff} \\cdot \\vec{v}_{diff}) + 2|\\vec{v}_{diff}|^2 t"
          }
        />

        <p>
          Solving for <Latex>$t$</Latex>, we obtain the time of CPA:
        </p>
        <CenteredLatex
          text={
            "t_{CPA} = \\frac{-\\vec{r}_{diff} \\cdot \\vec{v}_{diff}}{|\\vec{v}_{diff}|^2}"
          }
        />

        <p>
          If <Latex>{"$ t_{CPA} \\lt 0$"}</Latex>, the closest approach already
          occurred in the past.
        </p>
      </section>

      <br />
      <section id="protected-zones">
        <h1 className="text-xl font-semibold">Protected Airspace Volumes</h1>
        <p>
          TCAS defines protected zones around each aircraft as a vertical
          cylinder with radius <Latex>$R_p$</Latex> and height{" "}
          <Latex>$2H_p$</Latex>. These dimensions represent the minimum safe
          separation in both the horizontal and vertical directions.
        </p>
        <ul className="list-disc pl-10">
          <li>
            <b>Horizontal radius:</b> Typically ~0.6 nautical miles
          </li>
          <li>
            <b>Vertical half-height:</b> Approximately 1000 feet
          </li>
        </ul>

        <p>
          A potential violation occurs if, at some future time{" "}
          <Latex>$t$</Latex>, the intruder enters both the horizontal and
          vertical bounds of the protected zone. That is:
        </p>
        <CenteredLatex text={"\\sqrt{(x + v_xt)^2 + (y + v_yt)^2} \\le R_p"} />
        <CenteredLatex text={"|z + v_zt| \\le H_p"} />

        <p>Squaring the horizontal condition eliminates the square root:</p>
        <CenteredLatex text={"(x + v_xt)^2 + (y + v_yt)^2 = R_p^2"} />

        <p>Expanding and regrouping terms yields a quadratic in time:</p>
        <CenteredLatex
          text={
            "t^2(v_x^2 + v_y^2) + t(2xv_x + 2yv_y) + (x^2 + y^2 - R_p^2) = 0"
          }
        />

        <p>With coefficients:</p>
        <CenteredLatex
          text={
            "A = v_x^2 + v_y^2, \\quad B = 2xv_x + 2yv_y, \\quad C = x^2 + y^2 - R_p^2"
          }
        />

        <p>Use the quadratic formula to solve for entry/exit times:</p>
        <CenteredLatex text={"t = \\frac{-B \\pm \\sqrt{B^2 - 4AC}}{2A}"} />

        <p>
          Two real roots indicate the intruder will enter and exit the
          horizontal protected zone.
        </p>
      </section>

      <br />
      <section id="vertical-violation">
        <h1 className="text-xl font-semibold">Vertical Intrusion Analysis</h1>
        <p>
          Vertical intrusion is simpler and involves checking whether the
          altitude difference falls within <Latex>{"$\\pm H_p$"}</Latex>:
        </p>
        <CenteredLatex text={"|z + v_zt| \\le H_p"} />
        <p>Which expands to the inequality:</p>
        <CenteredLatex text={"-H_p \\le z + v_zt \\le H_p"} />

        <p>Solving this gives a time interval:</p>
        <CenteredLatex
          text={
            "t \\in \\left[ \\frac{-H_p - z}{v_z}, \\frac{H_p - z}{v_z} \\right]"
          }
        />

        <p>
          If the intruder is within this vertical zone at the same time it's
          horizontally within bounds, a collision threat exists.
        </p>
      </section>

      <br />
      <section id="combined-violation">
        <h1 className="text-xl font-semibold">Detecting Combined Intrusions</h1>
        <p>
          For TCAS to issue an alert, both conditions must be satisfied at the
          same moment. We compute the overlap (intersection) of the two time
          intervals:
        </p>
        <CenteredLatex text={"t_{horizontal} \\in [t_{H1}, t_{H2}]"} />
        <CenteredLatex text={"t_{vertical} \\in [t_{V1}, t_{V2}]"} />

        <p>Then:</p>
        <CenteredLatex
          text={
            "t_{violation} \\in [\\max(t_{H1}, t_{V1}), \\min(t_{H2}, t_{V2})]"
          }
        />

        <p>
          If this interval is non-empty and falls within the lookahead time
          window, an advisory is triggered.
        </p>
      </section>

      <br />
      <section id="advisories">
        <h1 className="text-xl font-semibold">
          Traffic and Resolution Advisories
        </h1>
        <p>
          Once a conflict is predicted, TCAS issues one of two types of
          advisories:
        </p>
        <ul className="list-disc pl-10">
          <li>
            <b>Traffic Advisory (TA):</b> Alerts the pilot to potential traffic,
            prompting increased situational awareness.
          </li>
          <li>
            <b>Resolution Advisory (RA):</b> Instructs the pilot to change
            vertical trajectory—either climb or descend—to avoid conflict.
          </li>
        </ul>

        <p>
          To determine whether a vertical maneuver will restore safe separation,
          the system models the predicted trajectory of both aircraft. Assuming
          constant acceleration for the ownship:
        </p>
        <CenteredLatex text={"z_{own}(t) = z_0 + v_{z0}t + \\frac{1}{2}at^2"} />
        <CenteredLatex text={"z_{intruder}(t) = z_i + v_{zi}t"} />

        <p>The condition for issuing a safe RA is:</p>
        <CenteredLatex
          text={
            "|z_{own}(t) - z_{intruder}(t)| > H_p \\quad \\forall t \\in [0, T_{RA}]"
          }
        />

        <p>
          Where <Latex>{"$T_{RA}$"}</Latex> is the lookahead time horizon for
          resolution advisories. TCAS continuously recalculates this in
          real-time.
        </p>
        <p>
          Most of the information has been taken from this link:{" "}
          <a
            className="underline"
            target="_blank"
            href="https://www.faa.gov/documentlibrary/media/advisory_circular/tcas%20ii%20v7.1%20intro%20booklet.pdf"
          >
            HERE
          </a>
        </p>
      </section>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING TCAS EXPLANATION SECTION
/////////////////////////////////////

export default TCASExplanationSection;
