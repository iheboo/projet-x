#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace ChefsNDishes.Models;
public class Chef
{
  [Key]
  public int ChefId { get; set; }
  [Required]
  [MinLength(2, ErrorMessage = "must be at least 2 characters.")]
  [MaxLength(30, ErrorMessage = "must be at most 30 characters.")]
  public string FirstName { get; set; }
  [Required]
  [MinLength(2, ErrorMessage = "must be at least 2 characters.")]
  [MaxLength(30, ErrorMessage = "must be at most 30 characters.")]
  public string LastName { get; set; }
  [Required]
  [MinimumAge(18, ErrorMessage = "Chef must be at least 18 years old.")]
  public DateTime DateOfBirth { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.Now;
  public DateTime UpdatedAt { get; set; } = DateTime.Now;
  public List<Dish> AllDishes { get; set; } = new List<Dish>();
}

public class MinimumAgeAttribute : ValidationAttribute
{
  private readonly int _minimumAge;
  public MinimumAgeAttribute(int minimumAge)
  {
    _minimumAge = minimumAge;
  }
  protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
  {
    if (value is null)
    {
      return new ValidationResult("Date of birth is required.");
    }
    if (value is DateTime dateOfBirth)
    {
      var age = DateTime.Today.Year - dateOfBirth.Year;
      if (DateTime.Today < dateOfBirth.AddYears(age))
      {
        age--;
      }
      if (age < _minimumAge)
      {
        return new ValidationResult(ErrorMessage);
      }
    }
    return ValidationResult.Success;
  }
}