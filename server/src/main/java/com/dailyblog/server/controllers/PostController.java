package com.dailyblog.server.controllers;

import com.dailyblog.server.dtos.PostDTO;
import com.dailyblog.server.models.Post;
import com.dailyblog.server.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173") // Allows our React app (Vite) to talk to this backend safely
public class PostController {

    @Autowired
    private PostService postService;

    // 1. CREATE a new post (POST request to http://localhost:8080/api/posts)
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDTO postDTO) {
        Post savedPost = postService.createPost(postDTO);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED); // Returns status 241 Created
    }

    // 2. GET ALL posts (GET request to http://localhost:8080/api/posts)
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK); // Returns status 200 OK
    }

    // 3. GET A SINGLE post by ID (GET request to http://localhost:8080/api/posts/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> postOptional = postService.getPostById(id);

        // Here is the IF block you mentioned! We check the Optional here at the network boundary.
        if (postOptional.isPresent()) {
            return new ResponseEntity<>(postOptional.get(), HttpStatus.OK); // Status 200 OK
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Status 404 Not Found
        }
    }

    @PutMapping("/{id}")
    // 4. UPDATE a post by ID (PUT request to http://localhost:8080/api/posts/{id})
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        try{
            Post updatedPost = postService.updatePost(id, postDTO);
            return new ResponseEntity<>(updatedPost, HttpStatus.OK); // Status 200 OK
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Status 404 Not Found if id missing
        }
    }

    // 5. DELETE a post by ID (DELETE request to http://localhost:8080/api/posts/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try{
            postService.deletePost(id);
            return new ResponseEntity<>("Post deleted successfully!",HttpStatus.OK); // Status 200 OK
        }catch (RuntimeException e){
            return new ResponseEntity<>("Post not found",HttpStatus.NOT_FOUND); // Status 404 Not Found
        }
    }

}
