package com.dailyblog.server.dtos;

import lombok.Data;

@Data
public class PostDTO {
    private String title;
    private String content;
    private String author;
}
