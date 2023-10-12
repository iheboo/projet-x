using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CRUDelicious.Models;

namespace CRUDelicious.Controllers;

public class HomeController : Controller
{
    private MyContext _context;
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger,MyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("")]
    public IActionResult Index()
    {
        List<Dish> AllDishes = _context.Dishes.ToList();
        return View(AllDishes);
    }

    [HttpGet("/dishes/new")]
    public IActionResult New()
    {
        return View();
    }

    [HttpPost("/dishes/add")]
    public IActionResult Add(Dish newDish)
    {
        if(ModelState.IsValid)
        {
            _context.Add(newDish);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
        return View("New");
    }

    [HttpGet("/dishes/{DishId}")]
    public IActionResult Show(int DishId)
    {
        Dish? oneDish = _context.Dishes.FirstOrDefault(p=>p.DishId == DishId);
        return View(oneDish);
    }

    [HttpPost("/dishes/{DishId}/delete")]
    public IActionResult Delete(int DishId)
    {
        Dish? dishToDelete = _context.Dishes.FirstOrDefault(p=>p.DishId == DishId);
        _context.Dishes.Remove(dishToDelete);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }

    [HttpGet("/dishes/{DishId}/edit")]
    public IActionResult Edit(int DishId)
    {
        Dish? dishToEdit = _context.Dishes.FirstOrDefault(p=>p.DishId == DishId);
        return View("Edit",dishToEdit);
    }

    [HttpPost("songs/{DishId}/update")]
    public IActionResult Update(int DishId, Dish updatedDish)
    {
        Dish? dishToEdit = _context.Dishes.FirstOrDefault(p=>p.DishId == DishId);
        if(ModelState.IsValid)
        {
            dishToEdit.Name = updatedDish.Name;
            dishToEdit.Chef = updatedDish.Chef;
            dishToEdit.Tastiness = updatedDish.Tastiness;
            dishToEdit.Calories = updatedDish.Calories;
            dishToEdit.Description = updatedDish.Description;
            dishToEdit.UpdatedAt = DateTime.Now;
            _context.SaveChanges();
            return RedirectToAction("Show",updatedDish);
        }
        return View("Edit",dishToEdit);
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
