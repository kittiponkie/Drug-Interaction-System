<template>

<div class="text-center">

  <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modalRegular">Regular map modal</button>
  <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalSatellite">Satellite map
    modal</button>
  <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalCustom">Custom map
    modal</button>



<!--Modal: Name-->
<div class="modal fade" id="modalRegular" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">

    <!--Content-->
    <div class="modal-content">

      <!--Body-->
      <div class="modal-body mb-0 p-0">

        <!--Google map-->
        <div id="map-container-google-16" class="z-depth-1-half map-container-9" style="height: 400px">
          <iframe src="https://maps.google.com/maps?q=new%20delphi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>

      </div>

      <!--Footer-->
      <div class="modal-footer justify-content-center">

        <button type="button" class="btn btn-info btn-md">Save location <i class="fas fa-map-marker-alt ml-1"></i></button>
        <button type="button" class="btn btn-outline-info btn-md" data-dismiss="modal">Close <i class="fas fa-times ml-1"></i></button>

      </div>

    </div>
    <!--/.Content-->

  </div>
</div>
<!--Modal: Name-->

<!--Modal: Name-->
<div class="modal fade" id="modalSatellite" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">

    <!--Content-->
    <div class="modal-content">

      <!--Body-->
      <div class="modal-body mb-0 p-0">

        <!--Google map-->
        <div id="map-container-google-17" class="z-depth-1-half map-container-10" style="height: 400px">
          <iframe src="https://maps.google.com/maps?q=new%20york&t=k&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>

      </div>

      <!--Footer-->
      <div class="modal-footer justify-content-center">

        <button type="button" class="btn btn-default btn-md">Save location <i class="fas fa-map-marker-alt ml-1"></i></button>
        <button type="button" class="btn btn-outline-default btn-md" data-dismiss="modal">Close <i class="fas fa-times ml-1"></i></button>

      </div>

    </div>
    <!--/.Content-->

  </div>
</div>
<!--Modal: Name-->

<!--Modal: Name-->
<div class="modal fade" id="modalCustom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">

    <!--Content-->
    <div class="modal-content">

      <!--Body-->
      <div class="modal-body mb-0 p-0">

        <!--Google map-->
        <div id="map-container-google-18" class="z-depth-1-half map-container-11"  style="height: 400px">
       <!--   <iframe src="https://maps.google.com/maps?q=los%20angeles&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0" style="border:0" allowfullscreen></iframe>-->
            <iframe width="600" height="450" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/undefined?origin=...&q=...&destination=...&center=...&zoom=...&key=..." allowfullscreen></iframe>
        </div>

      </div>

      <!--Footer-->
      <div class="modal-footer justify-content-center">

        <button type="button" class="btn btn-secondary btn-md">Save location <i class="fas fa-map-marker-alt ml-1"></i></button>
        <button type="button" class="btn btn-outline-secondary btn-md" data-dismiss="modal">Close <i class="fas fa-times ml-1"></i></button>

      </div>

    </div>
    <!--/.Content-->

  </div>
</div>
<!--Modal: Name-->
</div>
</template>
