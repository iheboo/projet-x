using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ProductsAndCategories.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ProductsAndCategories.Controllers;

public class HomeController : Controller
{
    private MyContext _context;
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, MyContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }
    public IActionResult Dashboard()
    {
        if(HttpContext.Session.GetInt32("userID") != null) {
            User? LoggedUser = _context.Users.Include(u=> u.MyProducts).FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
            List<Order> MyOrders = _context.Orders.Where(o=> o.BuyerId == LoggedUser.UserId).Include(o=> o.Product).ToList();
            List<Order> MySellings = _context.Orders.Where(o=> o.SellerId == LoggedUser.UserId).Include(o=> o.Buyer).ToList();
            ViewBag.MyOrders = MyOrders;
            ViewBag.MySellings = MySellings;
            return View("Dashboard", LoggedUser);
        } else {
            return RedirectToAction("Index");
        }
    }
    public IActionResult AddProduct()
    {
        if(HttpContext.Session.GetInt32("userID") != null) {
            User? LoggedUser = _context.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
           ViewBag.AllProducts = _context.Products.ToList();
            return View("AddProduct");
        } else {
            return RedirectToAction("Index");
        }
    }
    public IActionResult AddCategory()
    {
        if(HttpContext.Session.GetInt32("userID") != null) {
            User? LoggedUser = _context.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
           ViewBag.AllCategories = _context.Categories.ToList();
            return View("AddCategory");
        } else {
            return RedirectToAction("Index");
        }
    }

    public IActionResult AddOrder()
    {
        if(HttpContext.Session.GetInt32("userID") != null) {
            User? LoggedUser = _context.Users.Include(u=> u.Sellers).ThenInclude(a=> a.Seller).FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
            ViewBag.LoggedUser = LoggedUser;
            List<Product> NotMyProducts = _context.Products.Where(e=> e.UserId != LoggedUser.UserId).ToList();
            ViewBag.NotMyProducts = NotMyProducts;
            return View(viewName: "AddOrder");
        } else {
            return RedirectToAction("Index");
        }
    }

    //-----------------------------------------USER CONTEROLLERS----------------------------------------------------------
    //*                                         Rgister                                    

    [HttpPost("/user/add")]
    public IActionResult AddUser(User newUser)
    {
        if(ModelState.IsValid)
        {
            if(_context.Users.Any(u => u.Email == newUser.Email))
        {
            ModelState.AddModelError("Email", "Email already in use!");
            return View("Index");
        }
        PasswordHasher<User> Hasher = new PasswordHasher<User>();
        newUser.Password = Hasher.HashPassword(newUser, newUser.Password);
        _context.Add(newUser);
        _context.SaveChanges();
        HttpContext.Session.SetInt32("user",newUser.UserId);
        User? LoggedUser = _context.Users.Include(u=> u.MyProducts).FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
        List<Order> MyOrders = _context.Orders.Where(o=> o.BuyerId == LoggedUser.UserId).Include(o=> o.Product).ToList();
        List<Order> MySellings = _context.Orders.Where(o=> o.SellerId == LoggedUser.UserId).Include(o=> o.Buyer).ToList();
        ViewBag.MyOrders = MyOrders;
        ViewBag.MySellings = MySellings;
        return RedirectToAction("Dashboard", newUser);
    }
    return View("Index");
    }

    //*                                          Login                                
    [HttpPost("/login")]
    public IActionResult Login(LoginUser logUser) {
        if (ModelState.IsValid) {
            User? userInDB = _context.Users.FirstOrDefault(u => u.Email == logUser.LoginEmail);
            if (userInDB == null) {
                ModelState.AddModelError("LoginEmail", "Invalid Email/Password");
                return View("Index");
            }
            var hasher = new PasswordHasher<LoginUser>();
            var result = hasher.VerifyHashedPassword(logUser, userInDB.Password, logUser.LoginPassword);
            if (result == 0) {
                ModelState.AddModelError("LoginPassword", "Invalid Email/Password");
                return View("Index");
            }
             User? currentUser = _context.Users.FirstOrDefault(u => u.Email == logUser.LoginEmail);
             HttpContext.Session.SetInt32("userID", currentUser.UserId);
             User? LoggedUser = _context.Users.Include(u=> u.MyProducts).FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
            List<Order> MyOrders = _context.Orders.Where(o=> o.BuyerId == LoggedUser.UserId).Include(o=> o.Product).ToList();
            List<Order> MySellings = _context.Orders.Where(o=> o.SellerId == LoggedUser.UserId).Include(o=> o.Buyer).ToList();
            ViewBag.MyOrders = MyOrders;
            ViewBag.MySellings = MySellings;
             return RedirectToAction("Dashboard");
            
        } else {
           return View("Index");
        }
    }
    //*                                    Logout                                      
    [HttpGet("/logout")]
    public IActionResult Logout() {
        HttpContext.Session.Clear();
        return RedirectToAction("Index");
    }
//---------------------------------------------END OF USER CINTROLLERS-------------------------------------------------
    
//---------------------------------------------PRODUCT CONTROLLERS----------------------------------------------------

    //*                                           Add Product                                
    [HttpPost("/product/add")]
    public IActionResult AddNewProduct(Product newProduct)
    {
        if(ModelState.IsValid)
        {
            newProduct.UserId = (int)HttpContext.Session.GetInt32("userID");
            _context.Add(newProduct);
            _context.SaveChanges();
            ViewBag.AllProducts = _context.Products.ToList();
            return RedirectToAction("AddProduct");
        }
        ViewBag.AllProducts = _context.Products.ToList();
        return View("AddProduct");
    }

//---------------------------------------------CATEGORIES CONTROLLERS----------------------------------------------------
//*                                           Add Category                                

    [HttpPost("/category/add")]
    public IActionResult AddNewCategory(Category newCategory)
    {
        if(ModelState.IsValid)
        {
            _context.Add(newCategory);
            _context.SaveChanges();
            ViewBag.AllCategories = _context.Categories.ToList();
            return RedirectToAction("AddCategory");
        }
        ViewBag.AllCategories = _context.Categories.ToList();
        return View("AddCategory");
    }

    //---------------------------------------------Associations CONTROLLERS----------------------------------------------------
//*                                            Product To Categories Associations                                                     
    [HttpGet("/products/{productId}")]
    public IActionResult AddCategoriesToProduct(int productId)
    {
        Product? SelectedProduct = _context.Products.Include(p=> p.User).Include(p=> p.ProductCategories).ThenInclude(a=> a.Category).FirstOrDefault(p=> p.ProductId == productId);
        ViewBag.Product = SelectedProduct;
        List<Category> NotMyCategories = _context.Categories.Include(e=> e.CategoryProducts).ThenInclude(b=> b.Product).Where(c=> !c.CategoryProducts.Any(p=> p.ProductId == productId)).ToList();
        ViewBag.NotMyCategories = NotMyCategories;
        return View("AddCategoriesToProduct");
    }

    [HttpPost("/assocation/add/{productId}")]
    public IActionResult AddAssociation(int productId, Association newAssociation)
    {
        if(ModelState.IsValid == false)
        {
            return AddCategoriesToProduct(productId);
        }
        newAssociation.ProductId = productId;
        _context.Associations.Add(newAssociation);
        _context.SaveChanges();
        return RedirectToAction("AddCategoriesToProduct", new {productId = productId});
    }
//*                                            Category To Products Associations                                                     
    [HttpGet("/categories/{categoryId}")]
    public IActionResult AddCategoryToProducts(int categoryId)
    {
        Category? SelectedCategory = _context.Categories.Include(c=> c.CategoryProducts).ThenInclude(a=> a.Product).FirstOrDefault(p=> p.CategoryId == categoryId);
        ViewBag.Category = SelectedCategory;
        List<Product> NotMyProducts = _context.Products.Include(e=> e.ProductCategories).ThenInclude(b=> b.Category).Where(c=> !c.ProductCategories.Any(p=> p.CategoryId == categoryId)).ToList();
        ViewBag.NotMyProducts = NotMyProducts;
        return View("AddCategoryToProducts");
    }
    [HttpPost("/assocation/addCat/{categoryId}")]
    public IActionResult AddNewAssociation(int categoryId, Association newAssociation)
    {
        if(ModelState.IsValid == false)
        {
            return AddCategoriesToProduct(categoryId);
        }
        newAssociation.CategoryId = categoryId;
        _context.Associations.Add(newAssociation);
        _context.SaveChanges();
        return RedirectToAction("AddCategoryToProducts", new {categoryId = categoryId});
    }
//*                                                          Add Order                                                   
    [HttpPost("/order/add")]
    public IActionResult AddNewOrder(Order newOrder)
    {
        Product? OrderedProduct = _context.Products.FirstOrDefault(p=> p.ProductId == newOrder.ProductId);
        if(OrderedProduct.Quantity > newOrder.Quantity)
        {
            newOrder.BuyerId = (int)HttpContext.Session.GetInt32("userID");
            newOrder.SellerId = OrderedProduct.UserId;
            _context.Add(newOrder);
            OrderedProduct.Quantity = OrderedProduct.Quantity - newOrder.Quantity;
            OrderedProduct.UpdatedAt = DateTime.Now;
            _context.SaveChanges();
            return RedirectToAction("AddOrder");
        }
            User? LoggedUser = _context.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("userID"));
            ViewBag.LoggedUser = LoggedUser;
            List<Product> NotMyProducts = _context.Products.Where(e=> e.UserId != LoggedUser.UserId).ToList();
            ViewBag.NotMyProducts = NotMyProducts;
            ModelState.AddModelError("Quantity", "The Buyer Don't have Enough Quantity 😔🙏");
            return View("AddOrder");
    }
    public IActionResult Privacy()
    {
        return View();
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
