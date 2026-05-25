package com.dailyblog.server.repositories;

import com.dailyblog.server.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // By extending JpaRepository, Spring automatically grants us basic CRUD operations:
    // .save(), .findAll(), .findById(), .deleteById() without writing a single line of SQL code!
}
