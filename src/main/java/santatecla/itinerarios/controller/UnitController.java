package santatecla.itinerarios.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import santatecla.itinerarios.model.Itinerary;
import santatecla.itinerarios.model.Unit;
import santatecla.itinerarios.model.Form;
import santatecla.itinerarios.repo.ItineraryRepository;
import santatecla.itinerarios.repo.UnitRepository;
import santatecla.itinerarios.service.FileService;

@RepositoryRestController
@RequestMapping("units")
public class UnitController {
    private final UnitRepository repository;
    private final ItineraryRepository itineraryRepository;
    private final FileService fileService;

    public UnitController(UnitRepository repository, ItineraryRepository itineraryRepository, FileService fileService) {
        this.repository = repository;
        this.itineraryRepository = itineraryRepository;
        this.fileService = fileService;
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Unit> addUnit(@ModelAttribute @NotNull Unit unit) {
        return ResponseEntity.ok(repository.save(unit));
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Unit> postUnit(@RequestBody @NotNull Unit unit) {
        return ResponseEntity.ok(repository.save(unit));
    }

    @PostMapping(path = "/{unit}/itineraries", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Itinerary> addItinerary(@PathVariable @NotNull Unit unit,
            @ModelAttribute @Valid @NotNull Itinerary itinerary) {
        itinerary.setUnit(unit);
        return ResponseEntity.ok(this.itineraryRepository.save(itinerary));
    }

    @GetMapping("/{id}/forms")
    public ResponseEntity<Page<Form>> getFormsByUnitId(@PathVariable Long id, @PageableDefault Pageable page) {
        return ResponseEntity.ok(this.fileService.findAllByUnit_Id(id, page));
    }
}