package com.compteurapp.backendcompteurapp;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
public class CompteurDataTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompteurDataRepository repository;

    @InjectMocks
    private CompteurDataController controller;

    private List<CompteurData> testData;

    @BeforeEach
    public void setUp() {
        // Arrange
        testData = new ArrayList<>();
        LocalDateTime localDateTime = LocalDateTime.parse("2023-11-19T15:58:08.475");
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Z"));
        Date fixedDate = Date.from(zonedDateTime.toInstant());

        testData.add(new CompteurData(fixedDate, 100.0, "photo1", 1L, 1L, null, List.of()));
        testData.add(new CompteurData(fixedDate, 200.0, "photo2", 1L, 2L, null, List.of()));

        when(repository.findByClient(eq(1L), any(Pageable.class))).thenReturn(new PageImpl<>(testData));
    }

    @AfterEach
    public void tearDown() {
        // Clean up the test data after each test
        testData.clear();
    }

    @Test
    void testGetCompteurDataByClientId() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/getCompteurDataByClientId/1/0/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].valeur").value(testData.get(0).getValeur()))
                .andExpect(jsonPath("$[1].valeur").value(testData.get(1).getValeur()));
    }


    @Test
    void testGetCompteurDataByClientIdNotFound() throws Exception {
        when(repository.findByClient(eq(3L), any(Pageable.class))).thenReturn(Page.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/getCompteurDataByClientId/3/0/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
