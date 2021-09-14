import { Vec } from '../tools';

export class DragSubject {
  private type: Type;
  private offset?: Vec;

  static None(): DragSubject {
    const out = new DragSubject();
    out.type = Type.None;
    return out;
  }

  static CamRoot(): DragSubject {
    const out = new DragSubject();
    out.type = Type.CamRoot;
    return out;
  }

  static CamPan(): DragSubject {
    const out = new DragSubject();
    out.type = Type.CamPan;
    return out;
  }

  static SphereRoot(offset: Vec): DragSubject {
    const out = new DragSubject();
    out.type = Type.SphereRoot;
    out.offset = offset;
    return out;
  }

  static SphereScale(): DragSubject {
    const out = new DragSubject();
    out.type = Type.SphereScale;
    return out;
  }

  match<A>(handlers: MatchHandlers<A>): A {
    switch (this.type) {
      case Type.None:
        return handlers.none();
      case Type.CamRoot:
        return handlers.camRoot();
      case Type.CamPan:
        return handlers.camPan();
      case Type.SphereRoot:
        return handlers.sphereRoot(this.offset as Vec);
      case Type.SphereScale:
        return handlers.sphereScale();
    }
  }
}

enum Type {
  None = 'None',
  CamRoot = 'CamRoot',
  CamPan = 'CamPan',
  SphereRoot = 'SphereRoot',
  SphereScale = 'SphereScale',
}

interface MatchHandlers<A> {
  none: () => A;
  camRoot: () => A;
  camPan: () => A;
  sphereRoot: (offset: Vec) => A;
  sphereScale: () => A;
}
