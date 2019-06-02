package santatecla.itinerarios.controller;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import santatecla.itinerarios.model.User;
import santatecla.itinerarios.repo.UserRepository;
import santatecla.itinerarios.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Controller
@BasePathAwareController
@RequestMapping(value = "/users")
public class UserController {
    private UserRepository repo;
    private UserService userService;

    public UserController(UserRepository repo, UserService userService) {
        this.repo = repo;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> signUp(@Valid @NotNull @RequestBody User user) {
        if (this.repo.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(user);
        } else {
            return ResponseEntity.ok(this.repo.save(user));
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    @ResponseBody
    public User me() {
        return this.userService.getCurrentUser();
    }
}
