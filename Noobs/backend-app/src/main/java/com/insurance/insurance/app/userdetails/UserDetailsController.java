package com.insurance.insurance.app.userdetails;

import com.insurance.insurance.api.userdetails.UserDetailsDTO;
import com.insurance.insurance.domain.user.User;
import com.insurance.insurance.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping(name = "/p-api")
@RequiredArgsConstructor
public class UserDetailsController {

    private final UserDetailsAppService userDetailsAppService;

    @GetMapping("/{userId}/details")
    public ResponseEntity<?> getUserDetails(@PathVariable Long userId, @RequestParam Instant from, @RequestParam Instant to) {

        return ResponseEntity.ok(userDetailsAppService.getUserDetails(userId, from, to));
    }
}
