import React from "react";
import RangeSlider from "./RangeSlider";
import { CiDollar } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import { MdOutlineCall } from "react-icons/md";
import { CiViewBoard } from "react-icons/ci";
import { BiListUl } from "react-icons/bi";

const ThirdLeaderboardCard = ({ data, type }) => {
  return (
    <div className="card-wrapper card-wrapper-third">
      <div className="card-items">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div className="cards" key={index}>
              <div className="card-left center-items">
                <div>
                  <img src={item.profile} alt="" />
                </div>
                <div className="rank rank2">{item.rank}</div>
              </div>
              <div className="card-right">
                <div className="profile-name text-left">{item.name}</div>
                <RangeSlider />
                <div
                  className={`flex deals-info justify-between ${
                    type === "calls" || type === "listings" || type === "viewings" ? "start-items" : ""
                  }`}
                >
                  {type === "calls" ? (
                    <>
                      <div className="flex align-center pl-5 center-items">
                        <MdOutlineCall style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.calls ?? "N/A"}</span>
                      </div>
                      <div className="flex align-center pl-5 center-items">
                        <LiaPercentageSolid style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.dealPercentage ?? "N/A"}</span>
                      </div>
                    </>
                  ) : type === "listings" ? (
                    <>
                      <div className="flex align-center pl-5 center-items">
                        <BiListUl style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.listing ?? "N/A"}</span>
                      </div>
                      <div className="flex align-center pl-5 center-items">
                        <LiaPercentageSolid style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.dealPercentage ?? "N/A"}</span>
                      </div>
                    </>
                  ) : type === "viewings" ? (
                    <>
                      <div className="flex align-center pl-5 center-items">
                        <CiViewBoard style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.viewing ?? "N/A"}</span>
                      </div>
                      <div className="flex align-center pl-5 center-items">
                        <LiaPercentageSolid style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.dealPercentage ?? "N/A"}</span>
                      </div>
                    </>
                  ) : (
                    <>
                     <div className="flex align-center pl-5">
                        <CiDollar style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.dealAverage ?? "N/A"}</span>
                      </div>
                      <div className="flex align-center pl-5">
                        <BsCash style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.commission ?? "N/A"}</span>
                      </div>
                     
                      <div className="flex align-center label-image">
                        <MdLabelOutline style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.closed ?? "N/A"}</span>
                      </div>
                      <div className="flex align-center label-image">
                        <LiaPercentageSolid style={{ fontSize: "25", color: "#1f7bc1" }} />
                        <span>{item.dealPercentage ?? "N/A"}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ThirdLeaderboardCard;
