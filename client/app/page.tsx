import React, { useEffect, useState } from "react";
import MangaCard from "@/components/MangaCard";
import axios from "axios";
import { useEffectOnce } from "react-use";
import { useAtom } from "jotai";
import { feedAtom } from "@/atoms/feed";
import { useHydrateAtoms } from "jotai/utils";

async function getData() {
  const [{ data: dataFeed1 }, { data: dataFeed2 }] = await Promise.all([
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/feed`),
  ]);
  const nextPage = 3;

  return { feed: [...dataFeed1, ...dataFeed2], nextPage };
}

const IndexPage = async () => {


  const { feed, nextPage } = await getData();

  // const [loadMoreButton, setLoadMoreButton] = useState({
  //   isDisabled: false,
  // });

  // const loadMore = async () => {
  //   setLoadMoreButton({
  //     ...loadMoreButton,
  //     isDisabled: true,
  //   });

  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_HOST}/feed?p=${nextPage}`
  //     );

  //     if (!data?.length) {
  //       setNextPage(null);
  //     }

  //     setNextPage(nextPage! + 1);
  //     setFeed([...feed, ...data]);
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setLoadMoreButton({
  //       ...loadMoreButton,
  //       isDisabled: false,
  //     });
  //   }
  // };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 md:mx-0">
        {feed &&
          feed.map((feedItem: any) => (
            <MangaCard manga={feedItem} key={feedItem.link} />
          ))}
      </div>

      {/* <div className="text-center mt-4 mb-3">
        {nextPage && (
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={loadMoreButton.isDisabled}
          >
            Load more
          </button>
        )}
      </div> */}
    </>
  );
};

export default IndexPage;