using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserStore _store;
    public UsersController(UserStore store)
    {
        _store = store;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAll() => Ok(_store.GetAll());

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult Get(int id)
    {
        var user = _store.GetById(id);
        return user == null ? NotFound() : Ok(user);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Add([FromBody] User user)
    {
        user.Id = _store.GetAll().Max(u => u.Id) + 1;
        _store.Add(user);
        return Ok(user);
    }

    [HttpPut]
    [Authorize]
    public IActionResult Update([FromBody] User user)
    {
        _store.Update(user);
        return Ok(user);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        _store.Delete(id);
        return Ok();
    }
}
