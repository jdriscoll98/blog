import React from "react";

const Blog = () => {
  return (
    <div className="mx-auto w-4/5">
      <div className="bg-gray-100 dark:bg-gray-700 p-5 my-5 border-2 dark:border-gray-600 rounded-lg shadow-md">
        <h2 className="text-3xl">Post Title 1</h2>
        <p className="text-xl">
          Posted on <span className="underline">May 8, 2023</span> by{" "}
          <span className="underline">Author</span>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis
          orci ut leo vehicula, eget tempus ante vehicula. Etiam auctor est
          odio, nec fermentum nisl eleifend vitae.
        </p>
        <a href="#" className="underline text-gray-800 dark:text-gray-300">
          Read More
        </a>
      </div>
      {/* Add more blog post divs as needed */}
    </div>
  );
};

export default Blog;
