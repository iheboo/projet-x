using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ProductsAndCategories.Models;
using Microsoft.EntityFrameworkCore;

namespace CategoriesAndCategories.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ILogger<CategoryController> _logger;
        private MyContext db;

        // Constructor for the CategoryController class
        public CategoryController(ILogger<CategoryController> logger, MyContext context)
        {
            _logger = logger;
            db = context;
        }

        // HTTP GET action for displaying all categories
        [HttpGet("categories")]
        public IActionResult Categories()
        {
            // Retrieve all categories from the database
            List<Category> allCategories = db.Categories.ToList();
            return View("Categories", allCategories);
        }

        // HTTP POST action for creating a new category
        [HttpPost("categories/create")]
        public IActionResult CreateCategory(Category category)
        {
            // Check if the submitted model is valid
            if (!ModelState.IsValid)
            {
                // If not valid, reload the categories view with validation errors
                List<Category> allCategories = db.Categories.ToList();
                return View("Categories", allCategories);
            }

            // Add the new category to the database and save changes
            db.Categories.Add(category);
            db.SaveChanges();

            // Redirect to the "Categories" action to display all categories
            return RedirectToAction("Categories");
        }

        // HTTP GET action for displaying details of a specific category
        [HttpGet("categories/{CategoryId}")]
        public IActionResult ShowCategory(int CategoryId)
        {
            // Retrieve the category with its associated products
            Category? category = db.Categories
                .Include(c => c.AllAssociations)
                .ThenInclude(a => a.Product)
                .FirstOrDefault(d => d.CategoryId == CategoryId);

            // If the category does not exist, redirect to the "Categories" action
            if (category == null)
            {
                return RedirectToAction("Categories");
            }

            // Retrieve all available products to be displayed as options
            List<Product> availableProducts = db.Products.ToList();
            ViewData["AvailableProducts"] = availableProducts;

            // Display the category and associated products in the "ViewCategory" view
            return View("ViewCategory", category);
        }

        // HTTP POST action for adding a product to a category
        [HttpPost("/categories/addproduct")]
        public IActionResult AddProductToCategory(int ProductId, int CategoryId)
        {
            // Retrieve the category to which the product should be added
            Category? category = db.Categories
                .Include(p => p.AllAssociations)
                .FirstOrDefault(p => p.CategoryId == CategoryId);

            // If the category does not exist, redirect to the "Categories" action
            if (category == null)
            {
                return RedirectToAction("Categories");
            }

            // Retrieve the product to be added to the category
            Product? product = db.Products.FirstOrDefault(c => c.ProductId == ProductId);

            // If the product does not exist, redirect to the "Categories" action
            if (product == null)
            {
                return RedirectToAction("Categories");
            }

            // Check if the category is already associated with the product
            if (product.AllAssociations.Any(a => a.CategoryId == CategoryId))
            {
                // If already associated, redirect to the "ShowCategory" action
                return RedirectToAction("ShowCategory", new { CategoryId = CategoryId });
            }

            // Create a new association between the product and category
            Association newAssociation = new Association
            {
                Product = product,
                Category = category
            };

            // Add the new association to the database and save changes
            db.Associations.Add(newAssociation);
            db.SaveChanges();

            // Redirect to the "ShowCategory" action to display the updated category
            return RedirectToAction("ShowCategory", new { CategoryId = CategoryId });
        }
    }
}
