"use client";

import { useSearchQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  const hasNoResults =
    searchResults &&
    searchResults.tasks?.length === 0 &&
    searchResults.projects?.length === 0 &&
    searchResults.users?.length === 0;

  return (
    <div className="px-4 pt-5 pb-8 xl:px-6">
      <Header name="Search" textSmall />

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search tasks, projects, users..."
          className="dark:border-stroke-dark focus:outline-blue-primary/70 w-full max-w-2xl rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-1"
          onChange={handleSearch}
        />
      </div>

      {searchTerm.length < 3 && (
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Start typing to search
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Search for tasks, projects, or users.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="mt-8 text-center">
          <p className="text-slate-500">Loading...</p>
        </div>
      )}

      {isError && (
        <div className="mt-8 text-center">
          <p className="text-red-500">
            Error occurred while fetching search results.
          </p>
        </div>
      )}

      {!isLoading && !isError && searchResults && (
        <div className="space-y-10">
          {/* Tasks */}
          {searchResults.tasks && searchResults.tasks.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">
                Tasks ({searchResults.tasks.length})
              </h2>

              <div className="grid gap-4">
                {searchResults.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {searchResults.projects && searchResults.projects.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">
                Projects ({searchResults.projects.length})
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {searchResults.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Users */}
          {searchResults.users && searchResults.users.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">
                Users ({searchResults.users.length})
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {searchResults.users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {hasNoResults && searchTerm.length >= 3 && (
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 text-5xl">🔍</div>

          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            No results found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            We couldn't find anything matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
