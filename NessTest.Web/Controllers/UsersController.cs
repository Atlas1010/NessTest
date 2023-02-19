using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Models;
using Services;
using Microsoft.Extensions.Logging;
using NHibernate.Driver;
using Entities.Mapping;
using Services.mapping;
using Entities.Dbo;
namespace TestApp.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [EnableCors(policyName: "CorsPolicy")]
  public class UsersController : ControllerBase
    {

        //private static List<Users> Users = new List<Users>();

        private readonly ILogger<UsersController> _logger;
        private readonly EntityToModel _mapper;

        public UsersController(ILogger<UsersController> logger, EntityToModel mapper)
        {
            _logger = logger;
            _mapper = mapper;

        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            //var items = Users.ToList();

            var UsersList = _mapper.Users.ToList();
            return Ok(UsersList);
        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            //var items = Users.ToList();

            var UsersList = _mapper.Users.ToList();
            return Ok(UsersList);
        }
        [HttpPost]
        public IActionResult CreateUser(Entities.Dbo.Users data)
        {
           // var _User = _mapper.Users.Add(data);

            if (ModelState.IsValid)
            {
               _mapper.Users.Add(data);

                return CreatedAtAction("GetUserer", new { data.Id }, data);
            }

            return new JsonResult("Something went wrong") { StatusCode = 500 };
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(String id)
        {
            // var item = Users.FirstOrDefault(x => x.Id == id);
            var item = _mapper.Users.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(String id, Entities.Dbo.Users item)
        {
            if (id != item.Id)
                return BadRequest();

            var existItem = _mapper.Users.FirstOrDefault(x => x.Id == id);

            if (existItem == null)
                return NotFound();

            existItem.Username = item.Username;
            existItem.CreateDate = item.CreateDate;
            existItem.Salt = item.Salt;
            existItem.Organizationlevels = item.Organizationlevels;
            existItem.Managerid = item.Managerid;
            existItem.IsActive = item.IsActive;


            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDriver(String id)
        {
            var existItem = _mapper.Users.FirstOrDefault(x => x.Id == id);

            if (existItem == null)
                return NotFound();

            return Ok(existItem);
        }
    }


}
