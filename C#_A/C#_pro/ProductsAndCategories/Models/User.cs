#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ProductsAndCategories;
public class User
{
    [Key]
    public int UserId { get; set; } 
    [Required]
    [MinLength(2, ErrorMessage="Last Name must be 3 characters or longer!")]
    public string FirstName { get; set; }
    [Required]
    [MinLength(2, ErrorMessage="First Name must be 3 characters or longer!")]
    public string LastName { get; set; } 
    [EmailAddress]
    [Required]
    public string Email { get; set; }
    [DataType(DataType.Password)]
    [Required]
    [MinLength(8, ErrorMessage="Password must be 8 characters or longer!")]
    public string Password { get; set; } 
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    [NotMapped]
    [Compare("Password")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; }
    public List<Product> MyProducts {get;set;} = new List<Product>();
    //-------------------------Self Join Links--------------------------------------
    [InverseProperty("Seller")]
    public List<Order> Buyers { get; set; } = new List<Order>();
    [InverseProperty("Buyer")]
    public List<Order> Sellers { get; set; } = new List<Order>();
}

