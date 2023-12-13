using APMiniAssignment.Business.Models;

namespace APMiniAssignment.DataAccess.Repository
{
    public interface IBookRepository
    {
        Task<int> AddProduct(BooksModel _event);
        Task <BooksModel> Editbook(BooksModel book);
        Task<List<BooksModel>> GetAllProducts();
        Task<BooksModel> GetProductById(int id);
        bool IsAvailable(BooksModel data);
    }
}