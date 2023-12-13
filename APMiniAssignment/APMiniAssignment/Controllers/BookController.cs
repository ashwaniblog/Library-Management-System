using APMiniAssignment.Business.Models;
using APMiniAssignment.DataAccess.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APMiniAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepo;

        public BookController(IBookRepository bookRespository)
        {
            _bookRepo = bookRespository;
        }

        [HttpPost]
        [Route("addproduct")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddProduct([FromBody] BooksModel product)
        {
            if (product != null)
            {
                var id = await _bookRepo.AddProduct(product);
                if (id < 0)
                {
                    return BadRequest();
                }
                return Ok(product);
            }

            return BadRequest();
        }


        [HttpGet]
        [Route("getproduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            var products = await _bookRepo.GetAllProducts();
            return Ok(products);
        }

        [HttpGet]
        [Route("getsingleproduct/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var products = await _bookRepo.GetProductById(id);
            return Ok(products);
        }

        [HttpPost]
        [Route("isavailable")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public bool IsAvailable(BooksModel data)
        {
            return _bookRepo.IsAvailable(data);
        }

        [HttpPut]
        [Route("bookborrowupdate")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<BooksModel> UpdateBook(BorrowModel product)
        {
            var book = await _bookRepo.GetProductById(product.Id);

            book.Currently_Borrowed_By_User_Id = product.Currently_Borrowed_By_User_Id;

            var answer = await _bookRepo.Editbook(book);
            if (answer.Id > 0)
            {
                return book;
            }
            return book;
        }


    }
}
