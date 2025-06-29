import { useRef, useState, useEffect } from "react";
import ImagePreviewer from "../UI/ImagePreviewer";
import Error from "../UI/Error";
import type { Recipe } from "../../../../models/demos/fire-kitchen/recipe";
import { categories } from "../../../../models/demos/fire-kitchen/categories";
import SuccessModal from "../UI/SuccessModal";

const RecipeForm = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const ingredientsRef = useRef<HTMLTextAreaElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Recipe | null>(null);

  useEffect(() => {
    if (categoryRef.current && !categoryName) {
      const selectedIndex = categoryRef.current.selectedIndex;
      const selectedText = categoryRef.current.options[selectedIndex]?.text || "";
      setCategoryName(selectedText);
    }
  }, [categoryRef, categoryName]);

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageData(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredTitle = titleRef.current?.value?.trim() || "";
    const selectedCategory = categoryRef.current?.value;
    const enteredIngredients = ingredientsRef.current?.value?.trim();
    const enteredInstructions = instructionsRef.current?.value?.trim();
    const author = "You!";

    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    const id = `${slugify(enteredTitle)}-by-${slugify(author)}`;

    const data: Recipe = {
      id: id,
      title: enteredTitle || "",
      category: {
        name: categoryName,
        slug: selectedCategory || "",
      },
      imageUrl: imageData || "",
      ingredients: enteredIngredients || "",
      instructions: enteredInstructions || "",
      author,
      authorId: "#0",
    };

    if (!data.title || !data.imageUrl || !data.ingredients || !data.instructions) {
      setHasError(true);
      setErrorMessage("All fields are required!");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    setHasError(false);
    e.currentTarget.reset();
    setImageData(null);
    setFormData(data);
    setIsModalOpen(true);
  };

  const categoryChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.options[e.target.selectedIndex].text;
    setCategoryName(selectedCategoryName);
  };

  return (
    <>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
      />
      <form
        className="w-full md:w-3/4 xl:w-1/2 mx-auto text-white font-merienda"
        onSubmit={submitHandler}
        noValidate
      >
        {hasError && <Error title="" message={errorMessage} />}

        <div className="mb-5">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            ref={titleRef}
            required
            className="block w-full px-3 py-1.5 text-base font-normal leading-6 border-2 border-neutral-300 rounded-md
              bg-transparent focus:outline-none focus:ring-2 focus:ring-firekitchenprimary focus:border-firekitchenprimary"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="category" className="block font-semibold mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={categoryChangeHandler}
            className="block w-full px-3 py-1.5 text-base font-normal leading-6 border-2 border-neutral-300 rounded-md
              bg-transparent focus:outline-none focus:ring-2 focus:ring-firekitchenprimary focus:border-firekitchenprimary"
            ref={categoryRef}
          >
            {categories.map((category) => (
              <option
                className="bg-black hover:text-firekitchenprimary"
                key={category.slug}
                value={category.slug}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="block font-semibold mb-1">
            Image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            required
            className={`block w-full px-3 py-1.5 text-base font-normal leading-6 border-2 border-neutral-300 rounded-md
              bg-transparent
              file:px-3 file:py-1.5 file:mr-3
              file:border-0 file:border-r-2 file:border-neutral-300
              file:text-neutral-200 file:bg-transparent
              file:hover:cursor-pointer file:hover:text-white file:hover:bg-neutral-200
              file:[margin-inline-end:0.75rem]
              focus:outline-none focus:ring-2 focus:ring-firekitchenprimary focus:border-firekitchenprimary`}
            onChange={imageHandler}
          />
          <ImagePreviewer imageData={imageData} />
        </div>

        <div className="mb-5">
          <label htmlFor="ingredients" className="block font-semibold mb-1">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={3}
            ref={ingredientsRef}
            required
            className="block w-full px-3 py-2 text-base font-normal leading-6 border-2 border-neutral-300 rounded-md
              bg-transparent resize-none
              focus:outline-none focus:ring-2 focus:ring-firekitchenprimary focus:border-firekitchenprimary"
          ></textarea>
        </div>

        <div className="mb-8">
          <label htmlFor="instructions" className="block font-semibold mb-1">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows={5}
            ref={instructionsRef}
            required
            className="block w-full px-3 py-2 text-base font-normal leading-6 border-2 border-neutral-300 rounded-md
              bg-transparent resize-none
              focus:outline-none focus:ring-2 focus:ring-firekitchenprimary focus:border-firekitchenprimary"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block px-8 py-2 border-2 border-firekitchenprimary text-firekitchenprimary font-semibold rounded-md font-merienda
              hover:bg-firekitchenprimary hover:text-black transition-colors duration-300"
          >Share
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
