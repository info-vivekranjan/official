import React, { useContext, useEffect, useRef, useState } from 'react';
import { FetchAll, FetchCovid, FetchCovidCountry } from './FetchCovid';
import styles from './CovidDetails.module.css';
import { CovidTable } from './CovidTable';
import { SingleCountryData } from './SingleCountryData';
import covidLogo from "../covidimg.svg"
import { useWindowScroll } from 'react-use';
import { ThemeContext } from '../context/ThemeContextProvider';
import { Footer } from './Footer/Footer';


function CovidDetails() {

    const [query, setQuery] = useState("India");
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState("")
    const [countryData, setCountryData] = useState([])
    const [hl, setHl] = useState(true)

    const { y: pageYOffset } = useWindowScroll();
    const [isVisible, setIsVisible] = useState(false);


    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (pageYOffset > 100) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [pageYOffset])



    const ref = useRef();

    const handleAllData = () => {
        FetchAll()
            .then((res) => {

                console.log(res);
                setAllData(res.data)
            })
            .catch((err) => {

                console.log(err);
            })

    }
    useEffect(() => {
        handleAllData();
    }, [])



    const handleSingleData = () => {

        FetchCovid(query)
            .then((res) => {

                console.log(res.data);
                setData(res.data)
            })
            .catch((err) => {

                console.log(err);
            })



    }

    useEffect(() => {
        handleSingleData();
    }, [])



    const handleAllCountryData = () => {

        FetchCovidCountry()
            .then((res) => {

                // console.log(res);
                setCountryData(res.data)
            })
            .catch((err) => {

                console.log(err);
            })

    }

    useEffect(() => {
        handleAllCountryData();
    }, [])




    const handleMoveUp = () => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        handleMoveUp();
    }, [])


    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSingleData();
        }
    };




    return (
        <div className={styles.homePageCont}>
            <div ref={ref}></div>
            <div className={styles.landingPage}>


                <img src={covidLogo} alt="covidLogo" className={styles.covidLogoImg} />
                <h1 className={styles.typingerase}>Covid 19</h1>



                <>
                    <div className={styles.allDataCont}>
                        <div className={styles.allConfirmed}>
                            <h4>Confirmed</h4>
                            <h5> + {
                                Number(parseFloat(allData.todayCases).toFixed(2)).toLocaleString('en', {
                                    minimumFractionDigits: 0
                                })
                            }
                            </h5>
                            <h2>
                                {
                                    Number(parseFloat(allData.cases).toFixed(2)).toLocaleString('en', {
                                        minimumFractionDigits: 0
                                    })
                                }
                            </h2>

                        </div>

                        <div className={styles.allActive}>
                            <h4>Active</h4>
                            <h5>0</h5>
                            <h2>
                                {
                                    Number(parseFloat(allData.active).toFixed(2)).toLocaleString('en', {
                                        minimumFractionDigits: 0
                                    })
                                }
                            </h2>
                        </div>

                        <div className={styles.allRecovered}>
                            <h4>Recovered</h4>
                            <h5> + {
                                Number(parseFloat(allData.todayRecovered).toFixed(2)).toLocaleString('en', {
                                    minimumFractionDigits: 0
                                })
                            }
                            </h5>

                            <h2>
                                {
                                    Number(parseFloat(allData.recovered).toFixed(2)).toLocaleString('en', {
                                        minimumFractionDigits: 0
                                    })
                                }
                            </h2>
                        </div>

                        <div className={styles.allDeceased}>
                            <h4>Deceased</h4>
                            <h5> + {
                                Number(parseFloat(allData.todayDeaths).toFixed(2)).toLocaleString('en', {
                                    minimumFractionDigits: 0
                                })
                            }
                            </h5>

                            <h2>
                                {
                                    Number(parseFloat(allData.deaths).toFixed(2)).toLocaleString('en', {
                                        minimumFractionDigits: 0
                                    })
                                }
                            </h2>
                        </div>
                    </div>
                </>



            </div>



            <p style={{ fontWeight: "500", color: theme.textColor }}>Search your country</p>
            <div className={styles.wholeInputCont}>

                <div className={styles.inputCont} style={{ backgroundColor: theme.mainInputBG, boxShadow: theme.boxShadow }}>

                    <i onClick={handleSingleData} className="ri-search-line" style={{ backgroundColor: theme.mainInputBG }}>
                        <input className={styles.searchCountry}
                            value={query}
                            placeholder="Search Country"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeypress}
                            name="country"
                            style={{ backgroundColor: theme.mainInputBG }}
                        />
                    </i>

                </div>
                {/* <button className={styles.searchButton} onClick={handleSingleData}>Search</button> */}
            </div>


            <SingleCountryData data={data} />



            <CovidTable countryData={countryData} setHl={setHl} hl={hl} />



            {
                isVisible &&

                <div className={styles.scrollTopDiv}>

                    <i onClick={handleMoveUp} className="ri-arrow-up-s-line"></i>
                </div>

            }

            <Footer />

        </div >
    )
}
export { CovidDetails }