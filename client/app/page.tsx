"use client";

import React, { useState } from "react";
import MangaCard from "@/components/MangaCard";
import axios from "axios";
import { useEffectOnce } from "react-use";
import { useAtom } from "jotai";
import { Manga } from "@/types";
import { mangaFeed } from "@/atoms/feed";

async function getData() {
  const [{ data: feed }] = await Promise.all([
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/feed`),
  ]);

  const nextPage = 3;

  return { feed, nextPage };
}

const IndexPage = () => {
  const [feed, setFeed] = useAtom<Manga[]>(mangaFeed);
  const [nextPage, setNextPage] = useState<null | number>(null);
  const [loadMoreButton, setLoadMoreButton] = useState({
    isDisabled: false,
  });

  useEffectOnce(() => {
    // Skip if feed is not empty
    if (feed.length > 0) return;

    getData().then(({ feed, nextPage }) => {
      setFeed(feed);
      setNextPage(nextPage);
    });
  });

  const loadMore = async () => {
    setLoadMoreButton({
      ...loadMoreButton,
      isDisabled: true,
    });

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/feed?p=${nextPage}`
      );

      if (!data?.length) {
        setNextPage(null);
      }

      setNextPage(nextPage! + 1);
      setFeed([...feed, ...data]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadMoreButton({
        ...loadMoreButton,
        isDisabled: false,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 md:mx-0">
        {feed &&
          feed.map((feedItem: any) => (
            <MangaCard manga={feedItem} key={feedItem.link} />
          ))}
      </div>

      <div className="text-center mt-4 mb-3">
        {nextPage && (
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={loadMoreButton.isDisabled}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default IndexPage;
