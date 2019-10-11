using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;

namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDatasController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public UserDatasController(ResumeBuilderContext context)
        {
            _context = context;
        }

        [HttpGet("test")]
        public IActionResult testGet()
        {
            var resumes = _context.UserData.Where(s => s.UserId == 1)
                .Include(s => s.ResumeData).ToListAsync();

            return Ok(resumes);
        }


        // GET: api/UserDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserData>>> GetUserData()
        {
            return await _context.UserData.ToListAsync();
        }

        // GET: api/UserDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserData>> GetUserData(int id)
        {
            var userData = await _context.ResumeData
                .Where(u => u.UserId == id).Select(p => new { p.ResumeId, p.ResumeName, p.Layout})
                .ToListAsync();

            if (userData == null)
            {
                return NotFound();
            }

            return Ok(userData);
        }

        // PUT: api/UserDatas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserData(int id, UserData userData)
        {
            if (id != userData.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserDatas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public  ActionResult<UserData> PostUserData(UserData userData)
        {
            

            return CreatedAtAction("GetUserData", userData);
        }

        // DELETE: api/UserDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserData>> DeleteUserData(int id)
        {
            var userData = await _context.UserData.FindAsync(id);
            if (userData == null)
            {
                return NotFound();
            }

            _context.UserData.Remove(userData);
            await _context.SaveChangesAsync();

            return userData;
        }

        private bool UserDataExists(int id)
        {
            return _context.UserData.Any(e => e.UserId == id);
        }
    }
}
