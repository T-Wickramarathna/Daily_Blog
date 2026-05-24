package com.dailyblog.server.services;

import com.dailyblog.server.dtos.PostDTO;
import com.dailyblog.server.models.Post;
import com.dailyblog.server.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // 1. CREATE Operation
    public Post createPost(PostDTO postDTO) {
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setAuthor(postDTO.getAuthor());
        return postRepository.save(post);
    }

    // 2. READ ALL Operation
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    // 3. READ SINGLE Operation
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    // 4. UPDATE Operation
    public Post updatePost(Long id,PostDTO postDTO) {
        Optional<Post> existingPostOptional = postRepository.findById(id);

        if (existingPostOptional.isPresent()) {
            Post existingPost = existingPostOptional.get();
            existingPost.setTitle(postDTO.getTitle());
            existingPost.setContent(postDTO.getContent());
            existingPost.setAuthor(postDTO.getAuthor());
            return postRepository.save(existingPost); // .save() updates if the ID already exists
        }else{
            throw new RuntimeException("Blog post not found with id: " + id);
        }
    }

    // 5. DELETE Operation
    public void deletePost(Long id) {
        if(postRepository.existsById(id)) {
            postRepository.deleteById(id);
        }else{
            throw new RuntimeException("Blog post not found with id: " + id);
        }
    }

}
