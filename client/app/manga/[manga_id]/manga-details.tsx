"use client";

import { useManga } from "@/app/hooks/useManga";
import { Manga } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

interface GetDataProps {
  manga_id: string;
  manga: Manga;
}

const generateChapterLink = (
  mangaId: string | null,
  chapterId: string | null
) => {
  if (!mangaId || !chapterId) {
    return null;
  }

  return `/reader/${mangaId}/${chapterId}`;
};

export const MangaDetails = ({ params }: { params: GetDataProps }) => {
  const manga = params.manga;

  const MetaHead = () => {
    const title = manga ? `${manga.title} - Mangaclub` : "Mangaclub";

    return (
      <>
        <Head>
          <title>{manga ? `${manga.title} - Mangaclub` : "Mangaclub123"}</title>
          {manga && (
            <>
              <meta name="description" content={manga.description} />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={manga.description} />
              <meta property="og:image" content={manga.cover} />
            </>
          )}
        </Head>
      </>
    );
  };

  return (
    <>
      <MetaHead />
      <div className="w-[90%] flex flex-col gap-3 m-auto">
        <div>
          <Image
            className="w-[350px] h-auto block m-auto rounded-md"
            src={manga.cover}
            width={350}
            height={500}
            alt="cover"
          />
        </div>

        {manga.chapters && (
          <Link
            className="btn btn-primary"
            href={
              generateChapterLink(
                manga.id,
                manga.chapters[manga.chapters.length - 1].id
              ) || ""
            }
          >
            Read now
          </Link>
        )}

        <h3 className="text-xl font-semibold">{manga.title}</h3>

        <div className="flex gap-3 mt-2 flex-wrap">
          {manga.genres.map(({ genre }) => (
            <div key={genre.id} className="badge badge-primary badge-lg">
              {genre.name}
            </div>
          ))}
        </div>

        <h4 className="text-base font-bold mt-3">Description</h4>
        <p className="text-base">{manga.description}</p>

        <div className="mt-3">
          <div className="text-lg font-bold">Chapters</div>
        </div>

        {manga.chapters.map((chapter) => {
          return (
            <Link
              key={chapter.link}
              href={generateChapterLink(manga.id, chapter.id) || ""}
            >
              <span className="text-base hover:text-primary">
                {chapter.title}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
