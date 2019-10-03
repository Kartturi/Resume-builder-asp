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
    public class WorkDatasController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public WorkDatasController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/WorkDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkData>>> GetWorkData()
        {
            return await _context.WorkData.ToListAsync();
        }

        // GET: api/WorkDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkData>> GetWorkData(int id)
        {
            var workData = await _context.WorkData.FindAsync(id);

            if (workData == null)
            {
                return NotFound();
            }

            return workData;
        }

        // PUT: api/WorkDatas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkData(int id, WorkData workData)
        {
            if (id != workData.WorkId)
            {
                return BadRequest();
            }

            _context.Entry(workData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkDataExists(id))
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

        // POST: api/WorkDatas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<WorkData>> PostWorkData(WorkData workData)
        {
            _context.WorkData.Add(workData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkDataExists(workData.WorkId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWorkData", new { id = workData.WorkId }, workData);
        }

        // DELETE: api/WorkDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkData>> DeleteWorkData(int id)
        {
            var workData = await _context.WorkData.FindAsync(id);
            if (workData == null)
            {
                return NotFound();
            }

            _context.WorkData.Remove(workData);
            await _context.SaveChangesAsync();

            return workData;
        }

        private bool WorkDataExists(int id)
        {
            return _context.WorkData.Any(e => e.WorkId == id);
        }
    }
}
