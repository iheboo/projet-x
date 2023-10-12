#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;

namespace ProductsAndCategories.Models
{
    // Definition of the Category class
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        // The name of the category
        [Required]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(30, ErrorMessage = "Name must be at most 30 characters.")]
        public string Name { get; set; }

        // The date and time when the category was created
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // The date and time when the category was last updated
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // A list of associations between this category and products
        public List<Association> AllAssociations { get; set; } = new List<Association>();
    }
}
