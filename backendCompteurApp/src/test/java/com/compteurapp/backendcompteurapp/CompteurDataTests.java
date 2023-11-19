package com.compteurapp.backendcompteurapp;

import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
public class CompteurDataTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompteurDataRepository repository;

    @Test
    public void getCompteurDataByClientIdTest() throws Exception {
        CompteurData compteurData1 = new CompteurData(new Date(), 100.0, "photo1", 1L, 1L, null, List.of());
        CompteurData compteurData2 = new CompteurData(new Date(), 200.0, "photo2", 2L, 2L, null, List.of());

        List<CompteurData> compteurDataList = Arrays.asList(compteurData1, compteurData2);

        given(repository.findByClient(1L, PageRequest.of(0, 2))).willReturn(new PageImpl<>(compteurDataList));

        mockMvc.perform(MockMvcRequestBuilders.get("/getCompteurDataByClientId/1/0/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\": 1,\"date\": \"2023-11-19T15:58:08.475+00:00\",\"valeur\": 100.0,\"photo\": \"photo1\",\"client\": 1,\"vendeur\": 1},{\"id\": 2,\"date\": \"2023-11-19T15:58:08.475+00:00\",\"valeur\": 200.0,\"photo\": \"photo2\",\"client\": 2,\"vendeur\": 2}]"));
    }
}
