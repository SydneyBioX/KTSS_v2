/* export const generateResults = (event) => {
    
    console.log("wait time", waittime)
    setUpdatedClass("show")
    setUpdatedSelection("selectionAfter")
    // const avgAge = age.reduce((a,b) => a + parseFloat(b),0) / age.length
    // const avgPra = pra.reduce((a,b) => a + parseFloat(b),0) / pra.length
    const genderValue = gender? 1 : 0
    const diabetesValue = diabetes? 1 : 0
    const donorGenderValue = donorGender? 1 : 0
    // const avgKdri = kdri.reduce((a,b) => a + parseFloat(b),0) /kdri.length
    const donorDiabetesValue = donorDiabetes? 1 : 0
    // const avgDonorAge = donorAge.reduce((a,b) => a + parseFloat(b),0) / donorAge.length
    //const dataLabel = [age, waittime, genderValue, pra, blGroup, stateValue, diabetesValue, donorAge, donorGenderValue, kdri, donorBlGroup, donorDiabetesValue, hlaA, hlaB, hlaDr]
    const dataLabel = [age, waittime, genderValue, pra, blGroup, stateValue, diabetesValue, donorAge, donorGenderValue, kdpi, donorBlGroup, donorDiabetesValue, hlaA, hlaB, hlaDr]
    

    const firstMatch = findFirstMatch(simData)
    console.log(firstMatch)

    // console.log("Average age", avgAge)
    // console.log("Average pra", avgPra)
    console.log("Data Label", dataLabel)

    console.log("simData", simData)
    
    const trainingData = simData.map(item => 
      [item.recip_age,
      Math.round(item.wait_time),
      item.gender,
      item.recip_pra,
      item.blgroup,
      parseInt(item.state),
      item.diabetes,
      item.donor_age,
      item.donorGender,
      item.donor_kdri,
      item.kdpi,
      item.donorBlgroup,
      item.donorDiabetes,
      item.tx_misa,
      item.tx_misb,
      item.tx_misdr
    ]
    );

    
    console.log("TrainingData", trainingData)

    const trainingLabel = simData.map(item => item.recip_id_new
    )
     
    console.log("Training Label", trainingLabel)
    
    const knn = new KNN(trainingData, trainingLabel, {k : 3})

    console.log("Data label", dataLabel)
    const prediction = knn.predict(dataLabel)
    
    console.log("Prediction", prediction)

    const result = Object.values(simData).filter(item=>item.recip_id_new === prediction) 
    console.log("Result: ", result)
    
    const totalResult = result.map((res, idx) => ({
      seq: (idx % 4) + 1,
      kidney_quality: parseInt(res.kidney_quality*100),
      predictsurvprob: parseInt(res.predictsurvprob*100),
      wait_time: parseInt(res.wait_time),
      tx_misa: res.tx_misa,
      tx_misb: res.tx_misb,
      tx_misdr: res.tx_misdr,
      //kdri: Math.round(res.donor_kdri,2)
      kdpi: Math.round(res.donor_kdpi,2)
    }))

    console.log("totalResult", totalResult)

    let grpResult = totalResult.reduce((acc, cv) => {
      if (!acc[cv.seq]) {
          acc[cv.seq] = {};
          acc[cv.seq].seq = cv.seq;
          acc[cv.seq].count = acc[cv.seq].kidney_quality = acc[cv.seq].predictsurvprob= acc[cv.seq].wait_time= acc[cv.seq].tx_misa= acc[cv.seq].tx_misb= acc[cv.seq].tx_misdr= acc[cv.seq].kdri = 0
      }
      acc[cv.seq].count++;
      acc[cv.seq].kidney_quality += cv.kidney_quality;
      acc[cv.seq].predictsurvprob += cv.predictsurvprob;
      acc[cv.seq].wait_time += cv.wait_time;
      acc[cv.seq].tx_misa += cv.tx_misa;
      acc[cv.seq].tx_misb += cv.tx_misb;
      acc[cv.seq].tx_misdr += cv.tx_misdr;
    //   acc[cv.seq].kdri += cv.kdri;
      acc[cv.seq].kdpi += cv.kdpi;
      return acc;
    }, {});
  
    console.log("Group Result", grpResult)

    const avgResult = Object.keys(grpResult).map(key => {
      //let { seq, kidney_quality, predictsurvprob, wait_time, tx_misa, tx_misb, tx_misdr, kdri, count } = grpResult[key];
      let { seq, kidney_quality, predictsurvprob, wait_time, tx_misa, tx_misb, tx_misdr, kdpi, count } = grpResult[key];
      return {
        seq, 
        kidney_quality: kidney_quality / count, 
        predictsurvprob: predictsurvprob / count, 
        wait_time: wait_time / count,
        tx_misa: tx_misa / count,
        tx_misb: tx_misb / count,
        tx_misdr: tx_misdr / count,
        //kdri: kdri / count
        kdpi: kdpi / count
      };
  })
  console.log("Average result", avgResult)
    
  console.log("Chart Label", chartLabel, chartLabel[0].offer)

  const finalRes = avgResult.map((res, idx) => ({
    kidney_quality: res.kidney_quality,
    predictsurvprob: res.predictsurvprob,
    wait_time: res.wait_time,
    tx_misa: res.tx_misa,
    tx_misb: res.tx_misb,
    tx_misdr: res.tx_misdr,
    // kdri: res.kdri,
    kdpi: res.kdpi,
    offer: chartLabel[idx].offer
  }))

  console.log("Final results", finalRes)
  setUpdatedResults(finalRes)

  event.preventDefault()
  
  // const formData = new FormData(event.target)
  // const payload = Object.fromEntries(formData)

  // console.log(payload)
};  */