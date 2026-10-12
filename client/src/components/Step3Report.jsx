import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'





function Step3Report({ report }) {
  const navigate = useNavigate();


  if (!report) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>Loading report...</p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    question: `Question ${index + 1}`,
    score: score.score || 0
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  
  
  const downloadPDF = () => {
      const doc = new jsPDF("p", "mm", "a4");

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      let currentY = 20;

      // ==================== COLORS ====================
      const green = [22, 163, 74];
      const dark = [31, 41, 55];
      const gray = [107, 114, 128];
      const lightGreen = [240, 253, 244];
      const lightGray = [249, 250, 251];
      const white = [255, 255, 255];

      // ==================== HEADER ====================
      doc.setFillColor(...green);
      doc.rect(0, 0, pageWidth, 42, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...white);

      doc.text("AI Interview Report", margin, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(
          "Interview Performance & Evaluation",
          margin,
          27
      );

      doc.setFontSize(9);
      doc.text(
          `Generated: ${new Date().toLocaleDateString("en-IN")}`,
          pageWidth - margin,
          35,
          { align: "right" }
      );

      currentY = 52;

      // ==================== FINAL SCORE ====================
      doc.setFillColor(...lightGreen);
      doc.roundedRect(
          margin,
          currentY,
          contentWidth,
          29,
          3,
          3,
          "F"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...dark);

      doc.text("OVERALL PERFORMANCE", margin + 7, currentY + 9);

      doc.setFontSize(21);
      doc.setTextColor(...green);

      doc.text(
          `${finalScore}/10`,
          pageWidth - margin - 7,
          currentY + 19,
          { align: "right" }
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...gray);

      doc.text(
          "Final Interview Score",
          margin + 7,
          currentY + 20
      );

      currentY += 37;

      // ==================== SKILL ASSESSMENT ====================
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...dark);

      doc.text("Skill Assessment", margin, currentY);

      currentY += 7;

      const gap = 4;
      const cardWidth = (contentWidth - gap * 2) / 3;
      const cardHeight = 25;

      const skills = [
          { label: "Confidence", value: confidence },
          { label: "Communication", value: communication },
          { label: "Correctness", value: correctness },
      ];

      skills.forEach((skill, index) => {
          const x = margin + index * (cardWidth + gap);

          doc.setFillColor(...lightGray);
          doc.roundedRect(
              x,
              currentY,
              cardWidth,
              cardHeight,
              2,
              2,
              "F"
          );

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(...gray);

          doc.text(skill.label, x + 4, currentY + 8);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(...green);

          const skillValue = String(skill.value);
          const displayValue =
              skillValue.length > 16
                  ? skillValue.substring(0, 14) + "..."
                  : skillValue;

          doc.text(displayValue, x + 4, currentY + 18);
      });

      currentY += 35;

      // ==================== PROFESSIONAL ADVICE ====================
      let advice = "";

      if (finalScore >= 8) {
          advice =
              "Excellent performance! Maintain your confidence and structured approach. Continue improving answer clarity and supporting your responses with strong real-world examples.";
      } else if (finalScore >= 5) {
          advice =
              "A good foundation is demonstrated. Focus on improving answer structure, communication clarity, and confidence. Practise concise responses supported by relevant examples.";
      } else {
          advice =
              "Further improvement is needed. Focus on fundamental concepts, structured thinking, clear communication, and confident delivery. Practise answering interview questions aloud regularly.";
      }

      const splitAdvice = doc.splitTextToSize(
          advice,
          contentWidth - 14
      );

      const adviceHeight = Math.max(
          30,
          splitAdvice.length * 5 + 17
      );

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 226, 232);

      doc.roundedRect(
          margin,
          currentY,
          contentWidth,
          adviceHeight,
          3,
          3,
          "FD"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...green);

      doc.text(
          "Professional Advice",
          margin + 7,
          currentY + 9
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...dark);

      doc.text(
          splitAdvice,
          margin + 7,
          currentY + 17
      );

      currentY += adviceHeight + 10;

      // ==================== QUESTION-WISE EVALUATION ====================
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...dark);

      doc.text("Question-wise Evaluation", margin, currentY);

      currentY += 5;

      // Keep the question table readable and allow it to span pages.
      autoTable(doc, {
          startY: currentY,
          margin: {
              left: margin,
              right: margin,
              top: 18,
              bottom: 18,
          },

          head: [
              ["#", "Interview Question", "Score", "Feedback"],
          ],

          body: questionWiseScore.map((q, i) => [
              String(i + 1),
              q.question || "N/A",
              `${q.score}/10`,
              q.feedback || "No feedback available",
          ]),

          theme: "grid",

          styles: {
              font: "helvetica",
              fontSize: 8,
              cellPadding: 3,
              overflow: "linebreak",
              valign: "top",
              textColor: dark,
              lineColor: [229, 231, 235],
              lineWidth: 0.2,
          },

          headStyles: {
              fillColor: green,
              textColor: white,
              fontStyle: "bold",
              halign: "center",
              valign: "middle",
          },

          columnStyles: {
              0: {
                  cellWidth: 10,
                  halign: "center",
              },
              1: {
                  cellWidth: 65,
              },
              2: {
                  cellWidth: 18,
                  halign: "center",
              },
              3: {
                  cellWidth: "auto",
              },
          },

          alternateRowStyles: {
              fillColor: lightGray,
          },

          didDrawPage: () => {
              // Footer on every page.
              const pageNumber = doc.internal.getCurrentPageInfo()
                  .pageNumber;

              doc.setDrawColor(229, 231, 235);
              doc.line(
                  margin,
                  pageHeight - 13,
                  pageWidth - margin,
                  pageHeight - 13
              );

              doc.setFont("helvetica", "normal");
              doc.setFontSize(8);
              doc.setTextColor(...gray);

              doc.text(
                  "InterviewAl | AI Interview Performance Report",
                  margin,
                  pageHeight - 7
              );

              doc.text(
                  `Page ${pageNumber}`,
                  pageWidth - margin,
                  pageHeight - 7,
                  { align: "right" }
              );
          },
      });

      // ==================== DOWNLOAD PDF ====================
      doc.save("InterviewAl_Performance_Report.pdf");
  };








  


  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-green-100 sm:px-6 lg:px-10 py-8 PX-0'>
      
      <div className='md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 '>
        <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
          <button 
          onClick={()=>navigate("/history")}
          className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600'/></button>

          <div>
            <h1 className='text-3xl font-bold text-gray-800 flex-nowrap'>
              Interview Analysis Dashboard
            </h1 >
            <p className='text-gray-500 mt-2'>
              AI-powered performance insights and personalized feedback for your interviews.
            </p>
          </div >

        </div>

        <button 
        onClick={downloadPDF}
        className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl shadow-md transition-all duration-300 font-semibold p-3 text-sm  cursor-pointer sm:text-base text-nowrap">
          Download PDF
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
        <div className="space-y-3">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          className="bg-white p-6 shadow-lg rounded-2xl text-center hover:shadow-xl sm:rounded-3xl sm:p-8">
            <h3 className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Overall Performance</h3>
            <div className='w-20 h-20 sm:w-26 sm:h-26 mx-auto relative'>
              <CircularProgressbar value={percentage} text={`${score}/10`}
              styles={buildStyles({
                  pathColor: '#10b981',
                  textSize: '18px',
                  textColor: '#ef4444',
                  trailColor: '#e5e7eb',
                  backgroundColor: '#3e98c7',
                })}
              />
            </div>

            <p className="text-gray-400 mt-3 text-xs sm:text-sm">
              Out of 10
            </p>

            <div className="mt-4">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {performanceText}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>
            </div>

          </motion.div>

          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          className="bg-white p-6 shadow-lg rounded-2xl text-center hover:shadow-xl sm:rounded-3xl sm:p-8">
            <h3 className="text-gray-700 mb-4 font-semibold sm:mb-6 text-sm sm:text-base">Skill Evalution</h3>

            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index} >
                  <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm sm:text-base">{skill.label}</span>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base">{skill.value}/10</span>
                    </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${(skill.value / 10) * 100}%` }}>
                    </div>
                  </div>
                </div>
                
              ))}
            </div>

            
          </motion.div>

        </div>

        <div className='lg:col-span-2 space-y-6'>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-xl sm:rounded-3xl sm:p-8">
            <h3 className="text-gray-700 mb-4 font-semibold sm:mb-6 text-base sm:text-lg">Question-wise Performance</h3>

            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={questionScoreData}

                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" 
                   tickFormatter={(value, index) => `Q${index + 1}`} 
                  />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                
                  <Area type="monotone" dataKey="score" stroke="#22c55e" fill="#bbf7d0" strokewidth={3} />
                </AreaChart>
              </ResponsiveContainer>
              
            </div>
              
          </motion.div >

          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-xl sm:rounded-3xl sm:p-8">

            <h3 className="text-gray-700 mb-4 font-semibold sm:mb-6 text-base sm:text-lg">Question Breakdown</h3>

            <div className='space-y-6'>
              {questionWiseScore.map((q, i) => (
                <div key={i} className='bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200'>
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
                    <div>
                      <p className='text-xs text-gray-400'>
                        Question {i+1}
                      </p>
                      <p className='text-gray-800 font-semibold text-sm sm:text-base leading-relaxed'>{q.question || " Question Not Available"}</p>

                    </div>

                    <div className='bg-green-100 text-green-600 px-3 py-1 rounded-full  font-bold text-xs sm:text-sm w-fit'>
                      {q.score || 0}/10
                    </div>
                  </div>

                  <div className='bg-green-50 border border-green-200 p-4 rounded-lg'>
                    <p className='text-xs text-green-600 font-semibold mb-1'>
                      AI Feedback 
                    </p>


                    <p className='text-sm text-gray-700leading-relaxed'>
                      {q.feedback && q.feedback.trim() !== "" ? q.feedback : "No feedback is availble for this question"}
                    </p>
                    
                  </div>

                </div>
              ))}
            </div>

          </motion.div>
            

        </div>


      </div>
      
    </div>
  )
}

export default Step3Report
