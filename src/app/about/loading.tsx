import { LinkBtn } from "@/components/button";
import styles from "./about.module.scss";
import { MdHouse } from "react-icons/md";

export default function Loading() {
  return (
    <div className={styles.about}>
      <LinkBtn.NavigationIcon href="/">
        <MdHouse />
      </LinkBtn.NavigationIcon>
      <main className="animate-pulse">
        <div className="grid grid-cols-3 col-auto">
          <div className="space-x-1"></div>
          <div className="h-40 bg-slate-700 rounded"></div>
        </div>
        <div className="h-16 mt-4 bg-slate-700 rounded" />
        <div className="h-8 mb-8 bg-slate-700 rounded" />
        <hr />
        {Array(5)
          .fill("item")
          .map((_, index) => (
            <div key={index}>
              <h2>
                <div className="space-y-2">
                  <div className="h-8 bg-slate-700 rounded"></div>
                </div>
              </h2>
              <p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-8 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-8 bg-slate-700 rounded col-span-1"></div>
                </div>
              </p>
            </div>
          ))}
      </main>
    </div>
  );
}
