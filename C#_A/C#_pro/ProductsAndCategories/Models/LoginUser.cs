#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace ProductsAndCategories;
public class LoginUser
{
    [EmailAddress]
    [Required]
    public string LoginEmail { get; set; }
    [DataType(DataType.Password)]
    [Required]
    [MinLength(8, ErrorMessage="Password must be 8 characters or longer!")]
    public string LoginPassword { get; set; } 
}

