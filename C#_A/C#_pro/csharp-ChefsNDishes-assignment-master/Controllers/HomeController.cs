using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChefsNDishes.Models;

namespace ChefsNDishes.Controllers;

public class HomeController : Controller
{
  private readonly ILogger<HomeController> _logger;
  private MyContext db;

  public HomeController(ILogger<HomeController> logger, MyContext context)
  {
    _logger = logger;
    db = context;
  }

  [HttpGet("")]
  public IActionResult Index()
  {
    List<Chef> allChefs = db.Chefs.ToList();
    return View("AllChefs", allChefs);
  }

  [HttpGet("dishes")]
  public IActionResult AllDishes()
  {
    List<Dish> allDishes = db.Dishes.Include(c => c.Creator).ToList();
    return View(allDishes);
  }

  // redirect to New.cshtml
  [HttpGet("dishes/new")]
  public IActionResult NewDish()
  {
    List<Chef> allChefs = db.Chefs.ToList();
    ViewData["Chefs"] = allChefs;
    return View("NewDish");
  }

  // Create new dish
  [HttpPost("dishes/create")]
  public IActionResult CreateDish(Dish dish)
  {
    if (!ModelState.IsValid)
    {
      return View("NewDish");
    }
    db.Dishes.Add(dish);
    db.SaveChanges();
    return RedirectToAction("Index");
  }

  // redirect to NewForm
  [HttpGet("chefs/new")]
  public IActionResult NewChef()
  {
    return View("NewChef");
  }

  // Create new chef
  [HttpPost("chefs/create")]
  public IActionResult CreateChef(Chef chef)
  {
    if (!ModelState.IsValid)
    {
      return View("NewChef");
    }
    db.Chefs.Add(chef);
    db.SaveChanges();
    return RedirectToAction("Index");
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
