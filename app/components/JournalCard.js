import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageComponent from "./ImageComponent";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { CMS_URL } from "../Constant";

const JournalCard = ({ index, val, deleteJournal }) => {
  const router = useRouter();

  // get current screen width
  const useWidth = () => {
    const [width, setWidth] = useState(0);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return width;
  };
  let screenWidth = useWidth();

  return (
    <div
      // classname="box-shadow-class"
      style={{
        width:
          screenWidth > 2000
            ? "22.4%"
            : screenWidth > 1800
            ? "30%"
            : screenWidth > 1400
            ? "29%"
            : screenWidth > 1200
            ? "45%"
            : screenWidth > 900
            ? "43%"
            : screenWidth > 600
            ? "42%"
            : "100%",
        height: "350px",
        border: "1px solid #c7c7c7",
        borderRadius: 4,
        padding: 5,
        // marginBottom: 20,
        margin: "20px 20px 20px 20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ImageComponent
        imageUrl={CMS_URL + val?.coverImg}
        imgStyle={{
          width: "100%",
          height: "45%",
          borderRadius: 5,
          objectFit: "cover",
        }}
      />

      <p
        style={{
          color: "black",
          fontSize: 18,
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {val?.title?.length > 45
          ? val.title.substring(0, 45) + "..."
          : val.title}
      </p>

      <p
        style={{
          color: "black",
          fontSize: 16,
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        By - {val?.journalBy}
      </p>

      {/* <p
        style={{
          color: "black",
          fontSize: 16,
          fontWeight: "400",
          textTransform: "capitalize",
        }}
      >
        {val.description.length > 30
          ? val.description.substring(0, 30) + "..."
          : val.description}
      </p> */}

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "95%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <EditButton
          onClick={() => router.push(`/studio/journal/${val?.slug}`)}
          btnTitle="Edit"
          screenWidth={screenWidth}
          width="48%"
        />
        <DeleteButton
          onClick={() => deleteJournal(val?.slug)}
          btnTitle="Delete"
          screenWidth={screenWidth}
          width="48%"
        />
      </div>
    </div>
  );
};

export default JournalCard;
