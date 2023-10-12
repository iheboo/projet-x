using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsAndCategories.Models;

namespace ProductsAndCategories.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private MyContext db;

        // Constructor for the HomeController class
        public HomeController(ILogger<HomeController> logger, MyContext context)
        {
            _logger = logger;
            db = context;
        }

        // HTTP GET action for the home page
        [HttpGet("")]
        public IActionResult Index()
        {
            // Retrieve all products from the database
            List<Product> allProducts = db.Products.ToList();
            return View("Index", allProducts);
        }

        // HTTP POST action for creating a new product
        [HttpPost("products/create")]
        public IActionResult CreateProduct(Product product)
        {
            // Check if the submitted model is valid
            if (!ModelState.IsValid)
            {
                // If not valid, reload the index view with validation errors
                List<Product> allProducts = db.Products.ToList();
                return View("Index", allProducts);
            }

            // Add the new product to the database and save changes
            db.Products.Add(product);
            db.SaveChanges();

            // Redirect to the "Index" action to display all products
            return RedirectToAction("Index");
        }

        // HTTP GET action for displaying details of a specific product
        [HttpGet("products/{ProductId}")]
        public IActionResult ShowProduct(int ProductId)
        {
            // Retrieve the product with its associated categories
            Product? product = db.Products
                .Include(p => p.AllAssociations)
                .ThenInclude(a => a.Category)
                .FirstOrDefault(d => d.ProductId == ProductId);

            // If the product does not exist, redirect to the "Index" action
            if (product == null)
            {
                return RedirectToAction("Index");
            }

            // Retrieve all available categories to be displayed as options
            List<Category> availableCategories = db.Categories.ToList();
            ViewData["AvailableCategories"] = availableCategories;

            // Display the product and associated categories in the "ViewProduct" view
            return View("ViewProduct", product);
        }

        // HTTP POST action for adding a category to a product
        [HttpPost("/products/addcategory")]
        public IActionResult AddCategoryToProduct(int ProductId, int CategoryId)
        {
            // Retrieve the product to which the category should be added
            Product? product = db.Products
                .Include(p => p.AllAssociations)
                .FirstOrDefault(p => p.ProductId == ProductId);

            // If the product does not exist, redirect to the "Index" action
            if (product == null)
            {
                return RedirectToAction("Index");
            }

            // Retrieve the category to be added to the product
            Category? category = db.Categories.FirstOrDefault(c => c.CategoryId == CategoryId);

            // If the category does not exist, redirect to the "Index" action
            if (category == null)
            {
                return RedirectToAction("Index");
            }

            // Check if the category is already associated with the product
            if (product.AllAssociations.Any(a => a.CategoryId == CategoryId))
            {
                // If already associated, redirect to the "ShowProduct" action
                return RedirectToAction("ShowProduct", new { ProductId = ProductId });
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

            // Redirect to the "ShowProduct" action to display the updated product
            return RedirectToAction("ShowProduct", new { ProductId = ProductId });
        }

        // HTTP POST action for deleting a product
        [HttpPost("products/{ProductId}/destroy")]
        public IActionResult DestroyProduct(int ProductId)
        {
            // Retrieve the product to be deleted
            Product? ProductToDelete = db.Products.FirstOrDefault(d => d.ProductId == ProductId);

            // If the product does not exist, redirect to the "Index" action
            if (ProductToDelete == null)
            {
                return RedirectToAction("Index");
            }

            // Remove the product from the database and save changes
            db.Products.Remove(ProductToDelete);
            db.SaveChanges();

            // Redirect to the "Index" action to display the updated list of products
            return RedirectToAction("Index");
        }

        // Action for displaying the privacy page
        public IActionResult Privacy()
        {
            return View();
        }

        // Action for handling errors
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
